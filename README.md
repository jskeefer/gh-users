This project is to show my ability to create a project that searches
github users and paginates the results.

# Epic

## Ticket-1 Setup React App and install dependencies
Lets get Started!  Need to roadmap and research my approach to creating this project.  Going 
to use a few new libraries I have been learning: [React Router V6](https://github.com/ReactTraining/react-router/releases) and  
[Chakra UI](https://chakra-ui.com/).  
* use create-react-app to scaffold the app
* get rid of unnecessary files that are not needed
* install react router(v6), chakra UI
* set up routes to have '/' be the layout page and always show the search box and results components
* Add SearchBox, Page, and Results components 
* Create an API context provider to use global variables to hold the search options in

## Ticket-2 Implement SearchBox
*  Create a form with an input for search(q), dropdown for results per page(per_page), and apply 
button
* Add a toggle switch to add filters
    * if on show dropdown for sort by(sort - followers(default)|repositories|joined) and order(order - desc(default)|asc)
    * if off do not add filters to query
 * When apply button is clicked call an Api function to update the global search variables
 * Create fetch function in Api provider to construct query from current state of Api variables
* check the console to make sure results are coming back from the Api
* make several different queries to test results and add any error handling that might be needed

## Ticket-3 Add result component functionality to display pagination box 
* if results are 0, then display no results message
* figure out the number of pages based off of results and perPage
* display pagination buttons including next and previous
* navigate to page 

## Ticket-4 
* loop through data set and display results with a link to the github users profile
* make second call to get additional data for user

