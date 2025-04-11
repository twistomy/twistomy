# vite-react-with-app-builder

Template repository for Vite+React web apps that utilize my custom dynamic-app-builder package.

 * Note: vercel.json is necessary for multiple home path rewrites to work. For example, " ", "/", and "/home" all go to same page.

# Customize the Template
Currently, consts are used to create the configs for the components. JSON will be possible eventually. With the goal of creating all pages based off JSON files that are stored in a database.

## Before Customizing
Before ceating custom pages, some essential changes should be made

1. `index.html` the <link> and <title> within <head> should be changed to the desired website logo and name.
2. `.npmrc`
   - YOUR_PERSONAL_ACCESS_TOKEN should be replaced with the current personal access token (classic)
   - If environmental variables are being used for the personal access token, replace YOUR_PERSONAL_ACCESS_TOKEN with: ${ENVIRONMENT_VARIABLE_NAME_FOR_ACCESS_TOKEN}
3. Create `.env` file if you choose to use environment variables and add the access token to your `.env`.
4. `package.json` the `name` field should be changed to the desired name of the project.

## Pre-Made Configs
The following configurations are pre-made for the template

1. header and footer
    - A header and footer are already provided in the src/globalConfigs folder. They are imported into App.jsx and called into their respective <AppBuilder config={configName}> tags.
    - It is not necessary to import the configs for header and footer. If desired they can be made as consts in App.jsx.

2. Home and Contact
    - Home and Contact pages are already provided in the src/pages folder. They are imported into App.jsx.
    - Home and Contact pages also have pre-made configs in their respective files, they can be used as starting points.

## Creating New Pages
To create new pages, follow these steps
1. Create a new folder in the src/pages folder. Name the folder after the new page name.
2. Create a new file for the page in the folder you just made.
3. Add content to the page. There are multiple ways to do this. Here is an example with both ways:
```javascript
import { AppBuilder } from "@aleks-ey/dynamic-app-builder";
import pageConfig from "./PageConfig"; // configs can be made in seperate file for better readability and cleaner code

const PageName = () => {
    // example config as const in new page file, real config can be whatever you want
  const pageConfig = {
    type: "ElementComponent",
    props: {
      style: {
        backgroundColor: "bg-white",
        color: "text-white",
        height: "min-h-screen",
        width: "w-full",
      },
    },
    children: [
      {
        type: "ElementComponent",
        props: {
          style: {
            height: "h-screen",
            padding: "pt-32",
          },
        },
        children: [
          {
            type: "ElementComponent",
            props: {
              style: {
                className:
                  "justify-center items-center text-center font-florisha text-5xl",
              },
            },
            children: [
              {
                type: "TextComponent",
                props: {
                  text: "Hello World",
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <>
    {/* pageConfig can either be declared in this file or imported from config file */}
    {/* you could also import miltiple config files and assemble them into a singl config const in this file */}
      <AppBuilder config={pageConfig} />
    </>
  );
};

export default PageName;
```
4. If you choose to import the configs, just create new files in the current page folder with appropriate names. For example: PageConfig.jsx
5. Import the new page into App.jsx.

## Images

For deployment on Vercel, images and SVGs only work if they are in the public folder. So the deafult logo path for the provided code in this template is from the public folder.

## Styling

### Basics
You can use Tailwind CSS classes to style your components. All components have at least one "style" prop. You can add classes to the style prop like this:
 ```javascript
// style can all be one className:
style: {
    className: "w-20 h-20 text-red-500 hover:text-blue-500"
},
// or it can be an object with multiple styles
style: {
    wdith: "w-20",
    height: "h-20",
    color: "red",
    fontSize: "20px",
},
 ```
 Every component has default classes. These default classes will be overriden by the classes you provide in the style props if they affect the same css. For example, the button component may have a default class `border-2` but if we add `border-none` to our style prop, the AppBuilder will use our custom classes, so `border-none`. 

### SVGs
If you use SVGs, then you should use these options to change the color of them.
1. With tailwind css classes
    - Go to https://codepen.io/sosuke/pen/Pjoqqp
    - In the target color box, paste in your colors hexcode
    - Take note of the css `filter` that is returned at the bottom
    - In your svg style prop, add the classes like this: invert-[44%]
    - Here is a full example:
    ```javascript
    // target color was: #00a4d6
    // filter css we got was: filter: invert(44%) sepia(73%) saturate(3210%) hue-rotate(165deg) brightness(99%) contrast(109%);
    // so we can add that to our svg styling as tailwind css like this:
    style: {
        // in one line
        className: "w-20 h-20 shadow-none invert-[44%] sepia-[73%] saturate-[3210%] hue-rotate-[165deg] brightness-[99%] contrast-[109%]",
        // or seperately
        width: "w-20",
        height: "h-20",
        shadow: "shadow-none",
        filter: "invert-[44%] sepia-[73%] saturate-[3210%] hue-rotate-[165deg] brightness-[99%] contrast-[109%]",
    },
    ```

# Supabase
Supabase is the recommended tool for linking your project with backend data. It is easy to use, has a free plan, has an affordable paid plan, and is compatible with many other tools (e.g. Resend email api). 

## Setup

### Resend (Optional)

## Customize Supabase
You can customize the Supabase setup by creating a new files in the src/fetchUtilities folder. These files are used to get data from the supabase backend for pages. 

You can also create functions to send data to supabase either directly in the pages or in a seperate folder/file that you made. These functions can be passed as props to some of the components in dynamic-app-builder. For example, the FormComponent has a prop "onSubmit" that can take a function.
