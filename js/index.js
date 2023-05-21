
// store results here
var employeeDirectory;

// search feature variables 
var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-submit');

document.addEventListener('DOMContentLoaded', function () {
    var randomUser = 'https://randomuser.me/api/?page=3&nat=us&results=12&exc=gender,login,registered,id';

    fetch(randomUser)
        .then(function (response) {
            return response.json();
        })
        .then(function (getResponse) {
            var employeeDirectory = getResponse.results;
            var galleryContainer = document.getElementById('gallery');

            if (employeeDirectory && employeeDirectory.length > 0) {
                employeeDirectory.forEach(function (employee) {
                    var dirHTML = '<div class="card">';
                    dirHTML += '<div class="card-img-container">';
                    dirHTML += '<img class="card-img" src="' + employee.picture.large + '">';
                    dirHTML += '</div>';
                    dirHTML += '<div class="card-info-container">';
                    dirHTML += '<h3 id="name" class="card-name cap">' + employee.name.first + ' ' + employee.name.last + '</h3>';
                    dirHTML += '<p class="card-text">' + employee.email + '</p>';
                    dirHTML += '<p class="card-text cap">' + employee.location.city + ', ' + employee.location.state + '</p>';
                    dirHTML += '</div>';
                    dirHTML += '</div>';
                    galleryContainer.innerHTML += dirHTML;
                });
            } else {
                galleryContainer.innerHTML = 'No employees found.';
            }

            console.log(employeeDirectory);
            // Search form event
            searchButton.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the form submissions
                var searchTerm = searchInput.value.trim();
                performSearch(searchTerm, employeeDirectory);
              });
              
            

            // open the card that was clicked on  
            $('#gallery').click(function (e) {
                const target = $(e.target)
                console.log(target);
                if (!target.hasClass('gallery')) {
                    if (target.hasClass('card')) {
                        select = target.index();
                    }
                    if (target.parent().hasClass('card')) {
                        select = target.parent().index();
                    }
                    if (target.parent().parent().hasClass('card')) {
                        select = target.parent().parent().index();
                    }

                    // now i can return the values of the selected elements so i need attr() function
                    $('img.modal-img').attr('src', employeeDirectory[select].picture.large);
                    userName.textContent = employeeDirectory[select].name.first + ' ' + employeeDirectory[select].name.last;
                    userMail.textContent = employeeDirectory[select].email;
                    userCity.textContent = employeeDirectory[select].location.city;
                    userContact.textContent = employeeDirectory[select].cell;
                    userAddress.textContent = employeeDirectory[select].location.street.number + ', ' + employeeDirectory[select].location.state + ' ' + employeeDirectory[select].location.postcode;
                    userDob.textContent = 'Birthday: ' + employeeDirectory[select].dob.date.slice(0, 10); 
                    $('.modal-container').show()
                }
            });

        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});


// Search function
function performSearch(searchTerm, empDir) {
    // Clear the gallery container before populating with search results
    var galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = '';
  
    // Filter the employee directory based on the search term
    var filteredResults = empDir.filter(function (employee) {
      var fullName = employee.name.first + ' ' + employee.name.last;
      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    if (filteredResults.length > 0) {
      filteredResults.forEach(function (employee) {
        // Create the card components for each filtered employee
        var dirHTML = '<div class="card">';
        dirHTML += '<div class="card-img-container">';
        dirHTML += '<img class="card-img" src="' + employee.picture.large + '">';
        dirHTML += '</div>';
        dirHTML += '<div class="card-info-container">';
        dirHTML += '<h3 id="name" class="card-name cap">' + employee.name.first + ' ' + employee.name.last + '</h3>';
        dirHTML += '<p class="card-text">' + employee.email + '</p>';
        dirHTML += '<p class="card-text cap">' + employee.location.city + ', ' + employee.location.state + '</p>';
        dirHTML += '</div>';
        dirHTML += '</div>';
        galleryContainer.innerHTML += dirHTML;
      });
    } else {
      galleryContainer.innerHTML = 'No employees found.';
    }
  }
  


// Creating the main modal container and appending all data from API inside it
const modal_container = document.createElement('div');
modal_container.className = 'modal-container';
document.body.append(modal_container);


//modal
const modal = document.createElement('div');
modal.className = 'modal';
modal_container.append(modal);

const close_button = document.createElement('button');
close_button.className = 'modal-close-btn';
close_button.setAttribute('id', 'modal-close-btn')
close_button.innerHTML = '<strong>X</strong>';
modal.append(close_button);


const info_container = document.createElement('div');
info_container.className = 'modal-info-container';
modal.append(info_container);

const img = document.createElement('img');
img.className = 'modal-img';
img.setAttribute('src', 'https://placehold.it/125x125');
img.setAttribute('alt', 'profile picture');
info_container.append(img);

const userName = document.createElement('h3');
userName.className = 'modal-name cap';
userName.setAttribute('id', 'name');
userName.textContent = 'name';
info_container.append(userName);

const userMail = document.createElement('p');
userMail.className = 'modal-text';
userMail.textContent = 'email';
info_container.append(userMail);

const userCity = document.createElement('p');
userCity.className = 'modal-text cap';
userCity.textContent = 'city';
info_container.append(userCity);

const lineBreak = document.createElement('hr');
info_container.append(lineBreak);

const userContact = document.createElement('p');
userContact.className = 'modal-text';
userContact.textContent = '(555) 555-5555';
info_container.append(userContact);

const userAddress = document.createElement('p');
userAddress.className = 'modal-text cap';
userAddress.textContent = '123 Portland Ave., Portland, OR 97204';
info_container.append(userAddress);


const userDob = document.createElement('p');
userDob.className = 'modal-text';
userDob.textContent = 'Birthday:';
info_container.append(userDob);


// hide modal by default
$('.modal-container').hide()



// close button to hide container
$('#modal-close-btn').on('click', function () {
    $('.modal-container').hide();
})

// Close the modal when the user clicks outside of it
window.addEventListener('click', function (event) {
    if (event.target == modal_container) {
        $('.modal-container').hide();
    }
});








