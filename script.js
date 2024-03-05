// script.js
document.addEventListener("DOMContentLoaded", function() {
  // DataTable initialization
  var table = document.getElementById('example');
  var dataTable = new DataTable(table, {
      dom: '<"dt-buttons"Bf><"clear">lirtp',
      paging: false,
      autoWidth: true,
      columnDefs: [
          { orderable: false, targets: 2 }
      ],
      buttons: [
          'colvis',
          'copyHtml5',
          'csvHtml5',
          'excelHtml5',
          'pdfHtml5',
          'print'
      ]
  });

  // Open container
  var openButton = document.querySelector('.dt-open');
  var openContainer = document.querySelector('.inputsss');
  var closeContainer = document.querySelector('.dt-close');

  closeContainer.addEventListener('click', function() {
      openContainer.style.display = 'none';
  });

  openButton.addEventListener('click', function() {
      openContainer.style.display = 'flex';
  });

  // Add numbers
  var addButtons = document.querySelectorAll('.dt-add');
  var rowCounter = 1;

  addButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var openContainer = document.querySelector('.inputsss');
        var inputvalue = document.querySelector('.inputfeld').value;
        var countryCode = document.querySelector('.country').value;

        if (!inputvalue.trim()) {
            return;
        }

        var lines = inputvalue.split('\n');
        var uniqueNumbers = new Set();

        for (var j = 0; j < lines.length; j++) {
            var number = lines[j].trim().replace(/\s/g, ''); // Remove white spaces
            number = number.replace(/^\+/, ''); // Remove leading '+' sign
            number = number.replace(/^0+/, ''); // Remove leading zeros

            // Check if the number has 7 digits to determine if country code should be added
            var formattedNumber;
            if (number.length === 10) {
                formattedNumber = countryCode + number;
            } else {
                formattedNumber = number;
            }

            // Add formatted number to the set to check for duplicates
            uniqueNumbers.add(formattedNumber);
        }

        // Convert set back to an array
        var uniqueArray = Array.from(uniqueNumbers);

        for (var k = 0; k < uniqueArray.length; k++) {
            var newRow = document.createElement('tr');

            var cell1 = document.createElement('td');
            cell1.textContent = rowCounter++;

            var cell2 = document.createElement('td');
            cell2.textContent = uniqueArray[k];

            var cell3 = document.createElement('td');
            cell3.classList.add('text-center');

            var deleteButton = document.createElement('button');
            deleteButton.setAttribute('type', 'button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-xs', 'dt-delete');
            var deleteSpan = document.createElement('span');
            deleteSpan.classList.add('glyphicon', 'glyphicon-remove', 'dt-delete');
            deleteButton.appendChild(deleteSpan);

            cell3.appendChild(deleteButton);

            newRow.appendChild(cell1);
            newRow.appendChild(cell2);
            newRow.appendChild(cell3);

            dataTable.row.add(newRow).draw(false);
        }

        openContainer.style.display = 'none';
        document.querySelector('.inputfeld').innerHTML = '';
    });
});  // Delete numbers
  var dataTableContainer = document.querySelector('.dataTable');

  dataTableContainer.addEventListener('click', function(evt) {
      if (evt.target && evt.target.classList.contains('dt-delete')) {
          var dtRow = evt.target.closest('tr');
          if (confirm("Are you sure to delete this row?")) {
              dataTable.row(dtRow).remove().draw(false);
              updateRowIDs();
          }
      }
  });

  // Update row IDs
  function updateRowIDs() {
      var rows = dataTable.rows().nodes();
      for (var i = 0; i < rows.length; i++) {
          rows[i].querySelector('td:first-child').textContent = i + 1;
      }
  }

  // Modal
  var modal = document.getElementById('myModal');
  modal.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('modal')) {
          modal.style.display = 'none';
      }
  });

  var closeModalButtons = document.querySelectorAll('.modal .modal-header .close');
  for (var i = 0; i < closeModalButtons.length; i++) {
      closeModalButtons[i].addEventListener('click', function() {
          modal.style.display = 'none';
      });
  }
});
function handleDeleteButtonClick(evt) {
    const mediaContainer = evt.target.closest('.mediaContainer');
    if (mediaContainer) {
        mediaContainer.remove();
    }
}
const newInputButton = document.getElementById('newinput');
if (newInputButton) {
    newInputButton.addEventListener('click', () => {
        // Find the existing grid container
        const gridContainer = document.querySelector('.grid');
        if (gridContainer) {
            // Create a new media container
            const mediaContainer = document.createElement('div');
            mediaContainer.classList.add('mediaContainer', 'g-col-4');

            // Create the file input element
            const fileInputDiv = document.createElement('div');
            fileInputDiv.classList.add('mb-3');
            const fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.classList.add('form-control');
            fileInputDiv.appendChild(fileInput);

            // Create the textarea element
            const textareaDiv = document.createElement('div');
            textareaDiv.classList.add('mb-3');
            const textarea = document.createElement('textarea');
            textarea.classList.add('form-control');
            textarea.setAttribute('id', 'exampleFormControlTextarea1');
            textarea.setAttribute('rows', '3');
            textareaDiv.appendChild(textarea);

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('type', 'button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-xs', 'dt-delete');
            deleteButton.innerHTML = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
            deleteButton.addEventListener('click', handleDeleteButtonClick);

            // Append the file input, textarea, and delete button elements to the media container
            mediaContainer.appendChild(fileInputDiv);
            mediaContainer.appendChild(textareaDiv);
            mediaContainer.appendChild(deleteButton);

            // Append the media container to the grid container
            gridContainer.appendChild(mediaContainer);
        } else {
            console.error('Grid container not found.');
            console.error('Grid container not found.');
        }
    });
}
