# Creating a new article?
At first you need to create a new branch with the name of the article.
`git checkout -b <article>`

Then you create a new file with the name of the article and the extension .md
in the _posts.md directory. the name of the .md file should be in the following
 format: `<year>-<month>-<day>-<article-name>.md`.  

Please try to create a sub directory with the category of the article and place
 the article in there like `_posts/compute/2023-12-19-create-an-instance.md`.  

The contents of the file should have the following structure:

```
---
layout: page
tags: [<tags>]
page_title: <Page title>
---

<Here you should place the content of your article>
```
- The **layout** should be **page**, this is the default layout for all pages
exept for the homepage of the site.
- The **tags** are used to filter the articles in the sidebar they should
represent the category directory they are in.
- The **page_title** is the title in the sidebar and the title at the top of
the article.  

Please note that all articles should be written in English.

## Styling of the article
We use .md files for the articles the styling is done with markdown.
You can find a good tutorial here:
[Markdown Tutorial](https://guides.github.com/features/mastering-markdown/).

### Text line length
Please try to keep the line length of the text to a maximum of 79 characters.
This is to make sure the text is readable on all devices. When publishing the
site the text will be placed as if the 79 character limit is not there.


### Adding Hyperlinks
#### Hyperlink to local page/article
To add a hyperlink an article on the same site you need to use the following
code, the relative_url filter is used
to make sure the link is correct when the site is published both on the main
site and on potential forks in the future:
```markdown
[<link-text>]({{ '<link-url>' | relative_url }})
```

#### Hyperlink to external page
To add a hyperlink to an external page you need to use the following code, in
this case the relative_url is not needed:
```markdown
[<link-text>](<link-url>)
```


### Adding images
To add images to the article you need to place the image in the assets/images
folder.
Please create a sub directory with the name of the article and place the images
in there.
Then you can add the image to the article with the following code:
```markdown
<img class="rounded border border-dark" src="{{ '/assets/images/<article-name>/<image-name>' | relative_url }}" width="auto" height="400" />
```

# Review process
After you have created the article you need to create a pull request. if you
are not done editing yet you can create a draft pull request. Within the draft
pull request you can ask for feedback.

One of the approved community members will review the article and give you
feedback where needed. if the article is good to go it will be merged into
the main branch and will be published on the site.

## Reviewing an article
When reviewing an articles the following things should be checked:
- Is the article complete?
- Is the article correct?
- Is the article in the correct category?
- Is the article in the correct directory?
- Is the article in the correct format?
- Is the article in the correct language?
- Is the article in the correct styling?
- Are the hyperlinks correct?
- Are the linked media files correct? (images, videos, etc.)

If the article is not correct please give feedback to the author of the article
in the pull request.
If the article is correct please approve the pull request and merge it into the
main branch.

# Running the site locally
To run the site locally for testing purposes you need to install jekyll.
Please follow the instructions from
[Github](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
on how to run to site locally.