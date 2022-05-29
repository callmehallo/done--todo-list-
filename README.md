
# Done.

## [Github Pages](https://callmehallo.github.io/done--todo-list-/)


### Instructions to fill app with predefined tasks:


   1. inspect done web app and open console
   2. update your localStorage: 
  ```javascript
    //console..
    // first:
    localStorage.clear() 
    //second:
    localStorage.setItem('sections', '[{"section":"General","key":"ef1b53a3-cbab-4385-b743-f7bcd75b124c","tasks":[{"title":"Hello ","description":"World","date":"2022-05-29T13:33:09.711Z","flagged":false,"done":false,"key":"74f3c40b-6e18-41ab-af92-07216aceb756","sectionKey":"ef1b53a3-cbab-4385-b743-f7bcd75b124c"},{"title":"take the trash out","description":"","date":null,"flagged":true,"done":false,"key":"5e92638d-3365-4ebc-9171-192f43e5a2a0","sectionKey":"ef1b53a3-cbab-4385-b743-f7bcd75b124c"},{"title":"buy  groceries","description":"","date":"2022-05-29T22:00:00.000Z","flagged":false,"done":true,"key":"33377535-e06f-4869-aabc-8e64648d7593","sectionKey":"ef1b53a3-cbab-4385-b743-f7bcd75b124c"}]},{"section":"Programming","key":"09d35a30-2ef5-4519-b523-26ba328d989b","tasks":[{"title":"learn TypeScript","description":"","date":"2022-05-29T22:00:00.000Z","flagged":true,"done":false,"key":"b255a28c-6b1c-4fef-ba91-aafe8513b487","sectionKey":"09d35a30-2ef5-4519-b523-26ba328d989b"},{"title":"learn react Native ","description":"or maybe kotlin/swift","flagged":false,"done":false,"key":"5210d0be-f874-4ff8-baba-f18ba8e91924","sectionKey":"09d35a30-2ef5-4519-b523-26ba328d989b"},{"title":"finish todo app","description":"todo app exercise from the odin project website","date":"2022-05-29T13:38:03.600Z","flagged":false,"done":true,"key":"b2557846-97b3-4e50-93f6-7aafb9c488ce","sectionKey":"09d35a30-2ef5-4519-b523-26ba328d989b"}]},{"section":"University","key":"6d584438-659d-4c14-8985-08b10c21bffe","tasks":[{"title":"upcoming exam","description":"algorithms and data structures ","date":"2022-07-24T22:00:00.000Z","flagged":true,"done":false,"key":"f010e529-81ec-4409-b227-c7f9195c4696","sectionKey":"6d584438-659d-4c14-8985-08b10c21bffe"},{"title":"study group meeting ","description":"","date":"2022-06-01T22:00:00.000Z","flagged":false,"done":false,"key":"0ddcdb3e-79b2-4ee8-be93-4af8ba1d65ba","sectionKey":"6d584438-659d-4c14-8985-08b10c21bffe"},{"title":"buy new college block","description":"squared paper","date":null,"flagged":false,"done":false,"key":"958485e4-194b-4d9b-b81f-35d2948a5874","sectionKey":"6d584438-659d-4c14-8985-08b10c21bffe"}]}]')
  ```







### **Features:**
- add/delete/edit tasks and projects
- show/hide and uncheck completed tasks
- click on task to open extended task view
- your data will be stored in localstorage
- collapse projects
- counter for tasks inside the project
- flag tasks
- when task overdue or today, date will get red
- minimalistic style

### **libraries:**
  1. **immerjs**:
      * Is used to maintain immutability of state. 
      * I used immer mainly to push/delete elements in state array
  2. **date-fns**:
      * is used for manipulating dates
  3. **uuid**: 
      * generates unique IDs
  4. **tailwindcss**: 
      * a framework to write styles inside js files
   
### What I've learned: 

- how following hooks work: state, effect, reducer, context, custom hooks
- how to implent stateful forms and connect them with proper logic 
- how to implement controlled forms/components

## *the web app looks best on mobile view*
  