import os
import json
from datetime import datetime
from typing import Dict, List, Optional

def read_code_review_report() -> Optional[Dict]:
    """Read the code review report"""
    try:
        with open('reports/code_review_report.md', 'r') as f:
            content = f.read()
            return {
                "type": "code_review",
                "content": content
            }
    except Exception as e:
        print(f"Error reading code review report: {str(e)}")
        return None

def read_test_report() -> Optional[Dict]:
    """Read the test generation report"""
    try:
        with open('reports/test_generation_report.md', 'r') as f:
            content = f.read()
            return {
                "type": "test_generation",
                "content": content
            }
    except Exception as e:
        print(f"Error reading test report: {str(e)}")
        return None

def generate_dashboard_html(reports: List[Dict]) -> str:
    """Generate HTML dashboard content"""
    html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Development Assistant Dashboard</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: #2c3e50;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card h2 {
            color: #2c3e50;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }
        code {
            font-family: 'Monaco', 'Consolas', monospace;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .stat-card {
            background: #fff;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stat-card h3 {
            margin: 0;
            color: #2c3e50;
        }
        .stat-card p {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
            color: #3498db;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>AI Development Assistant Dashboard</h1>
        <p>Last updated: """ + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + """</p>
    </div>
    
    <div class="stats">
        <div class="stat-card">
            <h3>Files Analyzed</h3>
            <p>""" + str(count_files_analyzed(reports)) + """</p>
        </div>
        <div class="stat-card">
            <h3>Tests Generated</h3>
            <p>""" + str(count_tests_generated(reports)) + """</p>
        </div>
        <div class="stat-card">
            <h3>Suggestions Made</h3>
            <p>""" + str(count_suggestions(reports)) + """</p>
        </div>
    </div>
    """
    
    for report in reports:
        html += f"""
    <div class="card">
        <h2>{"Code Review Report" if report["type"] == "code_review" else "Test Generation Report"}</h2>
        <div class="report-content">
            {report["content"]}
        </div>
    </div>
    """
    
    html += """
</body>
</html>
    """
    
    return html

def count_files_analyzed(reports: List[Dict]) -> int:
    """Count number of files analyzed"""
    count = 0
    for report in reports:
        content = report["content"]
        count += content.count("## src/")
    return count

def count_tests_generated(reports: List[Dict]) -> int:
    """Count number of tests generated"""
    count = 0
    for report in reports:
        if report["type"] == "test_generation":
            content = report["content"]
            count += content.count("test('")
    return count

def count_suggestions(reports: List[Dict]) -> int:
    """Count number of suggestions made"""
    count = 0
    for report in reports:
        if report["type"] == "code_review":
            content = report["content"]
            count += content.count("- ")
    return count

def main() -> None:
    try:
        # Create reports directory if it doesn't exist
        os.makedirs('reports', exist_ok=True)
        
        # Read reports
        reports = []
        code_review = read_code_review_report()
        test_report = read_test_report()
        
        if code_review:
            reports.append(code_review)
        if test_report:
            reports.append(test_report)
            
        if not reports:
            print("No reports found to generate dashboard")
            return
            
        # Generate dashboard
        dashboard_html = generate_dashboard_html(reports)
        
        # Save dashboard
        with open('reports/index.html', 'w') as f:
            f.write(dashboard_html)
            
        print("Dashboard generated successfully!")
        
    except Exception as e:
        print(f"Error generating dashboard: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 