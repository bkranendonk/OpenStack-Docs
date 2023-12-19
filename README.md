# Creating a new article?
At first you need to create a new branch with the name of the article.
`git checkout -b <article>`

Then you create a new file with the name of the article and the extension .md in the _posts.md directory. the name of the .md file should be in the following format: `<year>-<month>-<day>-<article-name>.md`.  

Please try to create a sub directory with the category of the article and place the article in there like `_posts/compute/2023-12-19-create-an-instance.md`.  

The contents of the file should have the following structure:

```
---
layout: page
tags: [<tags>]
page_title: <Page title>
---

<Here you should place the content of your article>
```
- The **layout** should be **page**, this is the default layout for all pages exept for the homepage of the site.
- The **tags** are used to filter the articles in the sidebar they should represent the category directory they are in.
- The **page_title** is the title in the sidebar and the title at the top of the article.  



## Styling of the article
We use .md files for the articles the styling is done with markdown.
You can find a good tutorial here: [Markdown Tutorial](https://guides.github.com/features/mastering-markdown/)

### Adding images
To add images to the article you need to place the image in the assets/images folder.
Please create a sub directory with the name of the article and place the images in there.
Then you can add the image to the article with the following code:  
`![<Image description>](/assets/images/<article name>/<image name>)`

# Review process
After you have created the article you need to create a pull request. if you are not done editing yet you can create a draft pull request.

One of the community members will review the article and give you feedback where needed. if the article is good to go it will be merged into the main branch and will be published on the site.

# Running the site locally
To run the site locally for testing purposes you need to install jekyll.
Please follow the instructions from [github](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).