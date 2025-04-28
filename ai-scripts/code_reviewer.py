import os
import sys
import json
from datetime import datetime
import requests
from typing import Optional, List, Dict

def get_local_review_suggestions(file_path: str, content: str) -> str:
    """Fallback function that provides basic code review without API"""
    suggestions = []
    
    # Basic React/Next.js component checks
    if 'useState' in content and 'useEffect' not in content:
        suggestions.append("Consider if useEffect is needed for side effects with this state")
    
    if 'props' in content and 'type' not in content:
        suggestions.append("Consider adding TypeScript interfaces/types for props")
    
    if 'function' in content and 'memo' not in content:
        suggestions.append("Consider using React.memo for performance optimization if this component rerenders frequently")
    
    if 'catch' not in content and 'try' not in content:
        suggestions.append("Consider adding error boundaries or try-catch for better error handling")
    
    if 'aria-' not in content and 'role=' not in content:
        suggestions.append("Add ARIA attributes for better accessibility")
    
    if len(suggestions) == 0:
        suggestions.append("Code looks good! Consider adding more comments for better documentation.")
    
    return "\n".join([f"- {s}" for s in suggestions])

def setup_openai() -> Optional[str]:
    """Setup OpenAI with fallback options"""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("Warning: OPENAI_API_KEY not found, using fallback review system")
        return None
    return api_key

def get_code_review(api_key: Optional[str], file_path: str, content: str) -> str:
    if not api_key:
        print(f"Using fallback review system for {file_path}")
        return get_local_review_suggestions(file_path, content)
        
    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        prompt = f"""
        Please review the following Next.js/React TypeScript component code and provide 2-3 specific suggestions
        for improvement. Focus on:
        1. Code quality and TypeScript best practices
        2. Performance optimization
        3. Security considerations
        4. Accessibility
        
        File: {file_path}
        
        Code:
        {content}
        """
        
        # Try GPT-4 first, fall back to GPT-3.5 if not available
        models = ["gpt-4", "gpt-3.5-turbo"]
        last_error = None
        
        for model in models:
            try:
                data = {
                    "model": model,
                    "messages": [
                        {"role": "system", "content": "You are an expert Next.js/React/TypeScript developer performing code reviews."},
                        {"role": "user", "content": prompt}
                    ]
                }
                
                response = requests.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers=headers,
                    json=data,
                    timeout=30
                )
                
                if response.status_code == 200:
                    return response.json()['choices'][0]['message']['content'].strip()
                elif response.status_code == 404 and model == "gpt-4":
                    # GPT-4 not available, continue to next model
                    continue
                else:
                    print(f"API call failed with {model}: {response.text}")
                    last_error = response.text
            except Exception as e:
                print(f"Error calling OpenAI API with {model}: {str(e)}")
                last_error = str(e)
        
        print(f"All model attempts failed. Last error: {last_error}")
        print("Falling back to local review system...")
        return get_local_review_suggestions(file_path, content)
        
    except Exception as e:
        print(f"Error calling OpenAI API: {str(e)}")
        print("Falling back to local review system...")
        return get_local_review_suggestions(file_path, content)

def get_changed_files() -> List[str]:
    """Get list of changed files from the components directory"""
    components_dir = 'src/components'
    changed_files = []
    
    if not os.path.exists(components_dir):
        print(f"Warning: {components_dir} not found")
        return []
        
    for root, _, files in os.walk(components_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):  # Support both TypeScript and JavaScript
                changed_files.append(os.path.join(root, file))
    return changed_files

def read_file_content(file_path: str) -> str:
    try:
        with open(file_path, 'r') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {str(e)}")
        return ""

def save_review_report(reviews: List[Dict[str, str]]) -> None:
    """Save the review report as markdown"""
    if not reviews:
        print("No reviews to save")
        return
        
    report = {
        "timestamp": datetime.now().isoformat(),
        "reviews": reviews
    }
    
    try:
        os.makedirs('reports', exist_ok=True)
        with open('reports/code_review_report.md', 'w') as f:
            f.write("# AI Code Review Report\n\n")
            f.write(f"Generated on: {report['timestamp']}\n\n")
            
            for review in reviews:
                f.write(f"## {review['file']}\n\n")
                f.write(f"{review['suggestions']}\n\n")
    except Exception as e:
        print(f"Error saving review report: {str(e)}")

def main() -> None:
    try:
        api_key = setup_openai()
        changed_files = get_changed_files()
        
        if not changed_files:
            print("No TypeScript/React files found to review")
            sys.exit(0)
            
        reviews = []
        
        for file_path in changed_files:
            print(f"Reviewing {file_path}...")
            content = read_file_content(file_path)
            if content:
                suggestions = get_code_review(api_key, file_path, content)
                reviews.append({
                    "file": file_path,
                    "suggestions": suggestions
                })
        
        save_review_report(reviews)
        print("Code review completed successfully!")
        
    except Exception as e:
        print(f"Error during code review: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main() 