# OpenStack Documentation Guide

A comprehensive guide for creating and managing documentation using MkDocs.

## Getting Started

### Creating a New Article

**Create a new branch**
```bash
git checkout -b <article-name>
```

**Create the article file**
- Navigate to the `docs/` directory
- Create a new `.md` file following this naming convention: `<year>-<month>-<day>-<article-name>.md`
- Place the file in the appropriate category subdirectory: `docs/compute/2023-12-19-create-an-instance.md`

### Article Structure

Create your article using standard Markdown formatting:

```markdown
# Article Title

Your article content goes here using standard markdown syntax.
```

**Guidelines:**
- Use standard Markdown formatting (no special front matter required)
- Organize content with appropriate headers (`#`, `##`, `###`, etc.)
- All articles must be written in English

## Writing Guidelines

### Text Formatting
- Use standard Markdown for all styling
- Keep line length to 79 characters maximum for readability
- The 79-character limit is for editing only—publishing removes this constraint

### Hyperlinks

**Internal Links (Same Site)**
```markdown
[Link Text](../path/to/page.md)
```

**External Links**
```markdown
[Link Text](https://external-site.com)
```

### Images

**File Organization**
- Place images in `docs/assets/images/<article-name>/`
- Create a subdirectory for each article

**Image Syntax**
```markdown
![Alt text](../assets/images/<article-name>/<image-name>)
```

## Review Process

### Submitting Articles

1. Create a Pull Request after completing your article
2. Draft PRs are welcome for feedback during development
3. Request review from approved community members

### Review Checklist

When reviewing articles, verify:

- **Completeness**: Article covers the intended topic thoroughly
- **Accuracy**: Technical information is correct
- **Organization**: Proper category and directory placement
- **Format**: Follows established structure and naming conventions
- **Language**: Written in English with proper grammar
- **Styling**: Adheres to Markdown guidelines
- **Links**: All hyperlinks function correctly
- **Media**: Images and other media files are properly linked

### Approval Process

**For Reviewers:**
- Provide constructive feedback in PR comments for improvements needed
- Approve and merge PRs that meet all requirements

**For Authors:**
- Address reviewer feedback promptly
- Make requested changes before final approval

## Local Development

### Running the Site Locally

To run the MkDocs site locally for testing:

**Install MkDocs**
```bash
pip install -r requirements.txt
```

**Start the development server**
```bash
mkdocs serve
```

**View your site**
Navigate to `http://localhost:8000` in your browser

The site will automatically reload when you make changes to your documentation files.