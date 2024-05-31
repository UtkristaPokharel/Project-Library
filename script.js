// Get elements from the DOM
const container = document.getElementById("bookCardContainer");
const checkbox1 = document.getElementById('checkboxYes');
const checkbox2 = document.getElementById('checkboxNo');
const formmodel = document.getElementById('formmodel');
const btn = document.getElementById("addbook-btn");
const closeBtn = document.getElementsByClassName('closeBtn')[0];
const bookForm = document.getElementById('bookForm');

// Initialize an empty array to store the library
const myLibrary = [];

// Define the Book constructor
function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

// Create instances of the Book constructor and add them to the library
const thelordofthering = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1138, false);
myLibrary[0] = thelordofthering;
// myLibrary.push(thelordofthering);
const prideandprejudice = new Book('Pride and Prejudice', 'Jane Austen', 224, true);
myLibrary[1] = prideandprejudice;
const tokillamockingbird = new Book('To Kill a Mocking bird', 'Harper Lee', 324, false);
myLibrary[2] = tokillamockingbird;


// Function to add books to the library and display them on the page
function addBookToLibrary(myLibrary) {
	myLibrary.forEach(book => {
		const bookCard = document.createElement('div');
		bookCard.className = 'bookCard';

		const bookCardHeader = document.createElement('div');
		bookCardHeader.className = 'bookCardHeader';
		bookCardHeader.textContent = book.title;

		const deleteBtn = document.createElement('div');
		deleteBtn.className = 'deleteBtn';
		deleteBtn.innerHTML = '&times;';
		bookCardHeader.appendChild(deleteBtn);

		deleteBtn.addEventListener('click', () => {
			bookCard.remove();
		});

		bookCardHeader.classList.add(book.isRead ? 'readBook' : 'notreadBook');

		const Authortitle = document.createElement('div');
		Authortitle.className = 'Authortitle';
		Authortitle.textContent = 'Author';

		const Authorname = document.createElement('div');
		Authorname.className = 'Authorname';
		Authorname.textContent = book.author;

		const page = document.createElement('div');
		page.className = 'page';
		page.textContent = 'Pages';

		const bookpage = document.createElement('div');
		bookpage.className = 'bookpage';
		bookpage.textContent = book.pages;

		const bookCardFooter = document.createElement('button');
		bookCardFooter.className = 'bookCardFooter';

		if (book.isRead) {
			bookCardFooter.classList.add('readbookFooter');
			bookCardFooter.textContent = 'Read';
		} else {
			bookCardFooter.classList.add('notreadbookFooter');
			bookCardFooter.textContent = 'Not Read';
		}

		bookCardFooter.addEventListener('click', () => {

			book.isRead = !book.isRead;

			bookCardFooter.textContent = book.isRead ? 'Read ' : 'Not Read';

			if (book.isRead) {
				bookCardHeader.classList.add('readBook');
				bookCardHeader.classList.remove('notreadBook');
				bookCardFooter.classList.add('readbookFooter');
				bookCardFooter.classList.remove('notreadbookFooter');
			} else {
				bookCardHeader.classList.add('notreadBook');
				bookCardHeader.classList.remove('readBook');
				bookCardFooter.classList.add('notreadbookFooter');
				bookCardFooter.classList.remove('readbookFooter');
			}
		});


		bookCard.appendChild(bookCardHeader);
		bookCard.appendChild(Authortitle);
		bookCard.appendChild(Authorname);
		bookCard.appendChild(page);
		bookCard.appendChild(bookpage);
		bookCard.appendChild(bookCardFooter);
		container.appendChild(bookCard);
	});
}

// Call the function to add the books in the library to the page
addBookToLibrary(myLibrary);

// Set the initial value of the 'isRead' property
let isRead = false;

// Add event listeners to the checkboxes to update the 'isRead' property
checkbox1.addEventListener('change', () => {
	if (checkbox1.checked) {
		checkbox2.checked = false;
		isRead = true;
	}
});
checkbox2.addEventListener('change', () => {
	if (checkbox2.checked) {
		checkbox1.checked = false;
		isRead = false;
	}
});

// Add an event listener to the 'Add Book' button to display the form
// Add an event listener to the 'Add Book' button to display the form
btn.onclick = function () {
	formmodel.style.display = "block"; // Display the form model when the 'Add Book' button is clicked
	isRead = false; // Set the initial value of the 'isRead' property to false
	checkbox1.checked = false; // Uncheck the 'Read' checkbox
	checkbox2.checked = false; // Uncheck the 'Not Read' checkbox
}

// Add an event listener to the close button to hide the form
closeBtn.onclick = function () {
	formmodel.style.display = "none"; // Hide the form model when the close button is clicked
}

// Add an event listener to the window to hide the form if the user clicks outside of it
window.onclick = function (event) {
	if (event.target == formmodel) {
		formmodel.style.display = "none"; // Hide the form model if the user clicks outside of it
	}
}

// Add an event listener to the book form to handle form submissions
bookForm.addEventListener('submit', (e) => {
	e.preventDefault(); // Prevent the form from submitting normally

	const title = document.getElementById('title').value; // Get the value of the title input field
	const author = document.getElementById('author').value; // Get the value of the author input field
	const pages = document.getElementById('pages').value; // Get the value of the pages input field

	// Check if the input fields are empty or invalid
	if (title.trim() === '' || author.trim() === '' || pages.trim() === '' || isNaN(pages)) {
		alert('Please fill all the fields correctly'); // Alert the user to fill in all the fields correctly
		return;
	}

	// Create a new book object with the input field values
	const newbook = new Book(title, author, pages, isRead);

	// Add the new book object to the library array
	myLibrary.push(newbook);

	// Hide the form model
	formmodel.style.display = 'none';

	// Reset the form fields
	bookForm.reset();

	// Call the addBookToLibrary function to add the new book to the page
	const arrayLength = myLibrary.length;
	addBookToLibrary(myLibrary.slice(arrayLength - 1));
});