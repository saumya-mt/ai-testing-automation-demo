import os
import sys
import json
import requests
from typing import List, Dict, Optional
from datetime import datetime

def setup_openai() -> Optional[str]:
    """Setup OpenAI API key"""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        print("Error: OPENAI_API_KEY not found")
        return None
    return api_key

def get_component_files() -> List[str]:
    """Get list of component files to generate tests for"""
    components_dir = 'src/components'
    test_files = []
    
    if not os.path.exists(components_dir):
        print(f"Warning: {components_dir} not found")
        return []
        
    for root, _, files in os.walk(components_dir):
        for file in files:
            if file.endswith(('.jsx', '.tsx', '.js', '.ts')):
                test_files.append(os.path.join(root, file))
    return test_files

def read_file_content(file_path: str) -> str:
    """Read content of a file"""
    try:
        with open(file_path, 'r') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {str(e)}")
        return ""

def generate_test_cases(api_key: str, file_path: str, content: str) -> str:
    """Generate test cases using OpenAI API"""
    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        prompt = f"""
        Please generate Jest/React Testing Library test cases for the following React component.
        Focus on:
        1. Component rendering
        2. User interactions
        3. State changes
        4. Props validation
        5. Error cases
        
        Component file: {file_path}
        
        Code:
        {content}
        
        Generate complete test file content including imports and test cases.
        """
        
        # Try GPT-4 first, fall back to GPT-3.5 if not available
        models = ["gpt-4", "gpt-3.5-turbo"]
        last_error = None
        
        for model in models:
            try:
                data = {
                    "model": model,
                    "messages": [
                        {"role": "system", "content": "You are an expert React testing engineer."},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.7
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
                    continue
                else:
                    print(f"API call failed with {model}: {response.text}")
                    last_error = response.text
            except Exception as e:
                print(f"Error calling OpenAI API with {model}: {str(e)}")
                last_error = str(e)
        
        print(f"All model attempts failed. Last error: {last_error}")
        return generate_basic_test_template(file_path)
        
    except Exception as e:
        print(f"Error generating test cases: {str(e)}")
        return generate_basic_test_template(file_path)

def generate_basic_test_template(file_path: str) -> str:
    """Generate a basic test template as fallback"""
    component_name = os.path.basename(file_path).split('.')[0]
    return f"""
import React from 'react';
import {{ render, screen }} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {component_name} from '{file_path}';

describe('{component_name}', () => {{
    test('renders without crashing', () => {{
        render(<{component_name} />);
    }});

    test('matches snapshot', () => {{
        const {{ container }} = render(<{component_name} />);
        expect(container).toMatchSnapshot();
    }});

    // Add more test cases here
}});
"""

def save_test_file(file_path: str, test_content: str) -> None:
    """Save generated test file"""
    try:
        # Create test file path
        dir_name = os.path.dirname(file_path)
        base_name = os.path.basename(file_path)
        test_dir = os.path.join('tests', dir_name)
        test_file = os.path.join(test_dir, f"{base_name.split('.')[0]}.test.{base_name.split('.')[1]}")
        
        # Create directories if they don't exist
        os.makedirs(os.path.dirname(test_file), exist_ok=True)
        
        # Save test file
        with open(test_file, 'w') as f:
            f.write(test_content)
            
        print(f"Generated test file: {test_file}")
        
    except Exception as e:
        print(f"Error saving test file: {str(e)}")

def update_test_report(generated_tests: List[Dict[str, str]]) -> None:
    """Update the test generation report"""
    try:
        report = {
            "timestamp": datetime.now().isoformat(),
            "generated_tests": generated_tests
        }
        
        os.makedirs('reports', exist_ok=True)
        with open('reports/test_generation_report.md', 'w') as f:
            f.write("# AI Test Generation Report\n\n")
            f.write(f"Generated on: {report['timestamp']}\n\n")
            
            for test in generated_tests:
                f.write(f"## {test['file']}\n\n")
                f.write("```javascript\n")
                f.write(test['content'])
                f.write("\n```\n\n")
                
    except Exception as e:
        print(f"Error updating test report: {str(e)}")

def main() -> None:
    try:
        api_key = setup_openai()
        component_files = get_component_files()
        
        if not component_files:
            print("No component files found to generate tests for")
            sys.exit(0)
            
        generated_tests = []
        
        for file_path in component_files:
            print(f"Generating tests for {file_path}...")
            content = read_file_content(file_path)
            if content:
                test_content = generate_test_cases(api_key, file_path, content)
                save_test_file(file_path, test_content)
                generated_tests.append({
                    "file": file_path,
                    "content": test_content
                })
        
        update_test_report(generated_tests)
        print("Test generation completed successfully!")
        
    except Exception as e:
        print(f"Error during test generation: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main() 