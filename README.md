I built Multiplication Master as a way to practice coding a small project using vanilla JavaScript. This is the first in a series of projects I intend to complete as a way to explore how JS has changed over time and to get familiar with the different syntaxes and structures I might run across in the world. While this project uses vanilla JS, future projects will use prototyping, classes, React class components and React hooks.

How to view this project: https://codepen.io/nikki-graybeal/pen/OJOOGBq

How it works: Multiplication Master allows the user to choose which multiplication tables they would like to practice, an option to randomize the order they will be given the problems, and enter their answer and receive feedback as to whether their answer was correct or incorrect. A timer and problem countdown feature are used to generate feedback at the end of the session, which tells the user if they have mastered the chosen tables, are approaching mastery or need more practice. 

Choosing the tables: when the user clicks on the "begin practice" button, a handleSubmit function is called, which generates an object that contains all of the multiplication problems from their chosen tables. The key-value pairs in the object are in the form
0 x 0 : 0
where the key is a string and the value is a number.
This function then renders the first problem to the screen, either the problem at position [0] in the practiceProblems object or a randomly chosen entry from the practiceProblems object if the "random order" option is chosen.
Finally, the problem count is displayed, the timer is started and the submit button is disabled to avoid buggy timer behavior and reset of the problem count caused by a premature re-click. 

Submitting answer and generating feedback: when the "check answer" button is clicked or the user presses the return key, the handleAnswer function is called. This function begins by producing a new practiceProblems object that will be passed to the checkAnswer function along with the current answer and practice problem rendered to the screen. The checkAnswer function checks the user's answer and renders feedback to the screen to indicate whether the answer was correct or incorrect. 

Tracking and updating the state of practiceProblems: also within the handleAnswer function is code that tracks which problems are still unanswered. An empty array is initialized in the outer scope, called "correct", to hold all of the  problems that have been answered correctly. This array is updated with the currently displayed equation and answer by the checkAnswer function. handleAnswer uses this updated array to delete the problems already answered correctly from the practiceProblems object. This provides the number of unanswered problems for the problem count feature and a practiceProblems object containing only unanswered problems that is then passed to the resetDisplay function.
The resetDisplay function uses conditional logic to render feedback, stop the timer and reveal a "start again" button if there are no more problems left in the practiceProblems object passed to it. This logic also includes a way to skip directly to the end of the session by entering "442" in the answer input field for testing purposes. 
If there are still unanswered problems in the practiceProblems object, resetDisplay will update the screen with the next problem and clear the answer field by setting it's value to an empty string.

Resetting the session: once all of the practice problems have been answered and the "start over" button is revealed, the user may click on the button, which will trigger the handleReset function. This function unchecks any checked boxes from the user's chosen multiplication tables, resets the display of the equation, timer and problem count, sets the minutes and seconds variables back to 0 so the timer is reset, enables the "begin practice" button and then hides the "start over" button from the display. This effectively starts the entire session over without needing to reload the page. 

Next steps: Explore alternative ways to track and update the state of practiceProblems object (see "Things I still need clarity on:" below). With more functionality it may make sense to use OOP or even React. 
Add functionality: I'd like to add division and beginning algebraic concepts to this app in order to help students build strong associations between numbers that are related by multiplication and division functions. 
I would present multiplication and division problems side-by-side or consecutively to achieve this.
example:
3 x 9 = 27 would be coupled with
27 / 9 = 3 and
27 / 3 = 9

I also envision a drag and drop activity where students can place given numbers in blank equations.

beginning algebraic concepts would be presented with fill-in-the-blank style problems.
example:
___ X 9 = 27
the student would need to enter the correct number in the blank input field. 


Things I still need clarity on: Is there a way to structure my code without using classes that would allow me to persist the practiceProblems object outside of my functions and then just pass the object in its current state to the functions? Or is that the whole point of classes?? 

Possible solution: generate an empty practiceProblems object in the outer scope on first render and then update that object inside the onClick functions. I think this would work exactly how the correct array works.