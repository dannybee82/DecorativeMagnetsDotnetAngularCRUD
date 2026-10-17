# DecorativeMagnetsDotnetAngularCRUD

An _Angular 22_ application ([Angular CLI](https://github.com/angular/angular-cli) version 22.2.3) with _daisyUI_ (_Tailwind CSS_) that demonstrates the regular HttpClient with RxJS Observables.  
It uses a .NET/C# WebAPI as Backend and a PostgreSQL database.  
The .NET/C# WebAPI stores 'Decorative Magnets'/images and thumbnails in the database as base64-strings.

The Angular application can fetch, create, update and delete 'Decorative Magnets'.  
This application can upload images to the .NET/C# WebAPI.  
With the _SixLabors.ImageSharp library_, uploaded images are resized to thumbnails.

The Angular frontend application shows all 'Decorative Magnets', has a pager and pagination, fullscreen mode, detailspage, and a create and update page.

See the images in the root of this project for examples.

## Running the application

### _1\. Docker Desktop / Docker_

To see the application in action within a _Docker Container_, use the command from the root of this project:

**docker compose up --build -d**

### _2\. Local installation_

**A) PostgreSQL database:**

See the folder: _Docker\_PostgreSQL_ with the docker-compose file.

Command to run the database in a _Docker container_ with _Docker Desktop_ from the folder _Docker\_PostgreSQL_:

**docker-compose up --build -d**

**B) Add database migrations**

Install the **dotnet ef-tool** - version: 8.0.11 or above

When the tool is installed, run the command for a _database migration:_

**dotnet ef database update**

Or use the longer command (and replace: \*_YOUR\_WORKSPACE_\*):  
_dotnet ef database update -p_ \*_YOUR\_WORKSPACE_\*_/DecorativeMagnetsDotnetAngularCRUD/Backend/RepositoryLayer/RepositoryLayer.csproj" --startup-project "_\*_YOUR\_WORKSPACE_\*_/DecorativeMagnetsDotnetAngularCRUD/Backend/DecorativeMagnetsWebApi/DecorativeMagnetsWebApi.csproj"_

For more information see the link below:

[https://learn.microsoft.com/en-us/ef/core/cli/dotnet](https://learn.microsoft.com/en-us/ef/core/cli/dotnet)

**C) Angular application installation**

_Note:_ **Angular 22** needs a **Node.js** version of at least _22.22.3_

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_Ocotober 2026_

**General changes:**

\- Dockerized the whole application and added a new _docker-compose.yml_ file in the root of this project for the whole application.

**Frontend:**

\- Upgraded packages.

\- Changed grid and cards.

**Backend:**

\- Added 8 new Decorative Magnets.

\- Fixing a small typing mistake.

_June 2026_

**Frontend:**

\- Upgrade to _Angular 22_ and upgraded other packages.

\- Migrated _@Injectable_ to _@Service_ (except for 1 _@Injectable_).

\- Using the default: _ChangeDetectionStrategy.OnPush_ in stead of _ChangeDetectionStrategy.Eager_.

\- Using the latest file naming conventions - and deleting the old schematics from _angular.json_

\- Various small changes.

**Backend:**

\- Replaced 2 old Decorative Magnets with 2 new Decorative Magnets.

_March 2026_

**Frontend:**

\- Updated packages for _@angular/cli@21.2.1_

\- Various changes in the components.

\- Updated import statements for specification files (_Vitest_).

\- _Signal Forms_ use _\[formField\]_ directive.

\- Added functionality for alphabetically sorting.

**Backend:**

\- Added 8 new Decorative Magnets.

\- Added functionality for alphabetically sorting.

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