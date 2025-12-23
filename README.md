# DecorativeMagnetsDotnetAngularCRUD

An _Angular 21_ application (with [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4) with _daisyUI_ (_Tailwind CSS_) that demonstrates the regular HttpClient with Observables.  
It uses a .NET/C# WebAPI as Backend and a PostgreSQL database.  
The .NET/C# WebAPI stores 'Decorative Magnets'/images and thumbnails in the database as base64-strings.

The Angular application can fetch, create, update and delete 'Decorative Magnets'.  
This application can upload images to the .NET/C# WebAPI.  
With the _SixLabors.ImageSharp library_, uploaded images are resized to thumbnails.

The Angular frontend application shows all 'Decorative Magnets', has a pager and pagination, fullscreen mode, detailspage, and a create and update page.

See the images in the root of this project for examples.

### **PostgreSQL database:**

See the folder: _Docker\_PostgreSQL_ with the docker-compose file.

Command to run the database in a _Docker container_ with _Docker Desktop_:

**docker-compose up --build -d**

### **Add database migrations**

Install the **dotnet ef-tool** - version: 8.0.11 or above

When the tool is installed, run the command for a _database migration:_

**dotnet ef database update**

For more information see the link below:

[https://learn.microsoft.com/en-us/ef/core/cli/dotnet](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

### **Angular application installation**

_Note:_ **Angular 21** needs a **Node.js** version of at least _20.19.0_

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_December 2025 (more changes)_

**Backend:**  
\- Added 4 additional Decorative Magnets.

\- Fixed and replaced 3 Decorative Magnets.

**Frontend:**

\- Updated packages.

\- Minor change in open file component.

\- Change in _signal form_: added explicit type: _(context: RootFieldContext)_.

\- Minor CSS fix for thumbnails.

\- Updated example images.

_December 2025_

\- First commit