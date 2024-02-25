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

          for (var j = 0; j < lines.length; j++) {
              var newRow = document.createElement('tr');

              var cell1 = document.createElement('td');
              cell1.textContent = rowCounter++;

              var cell2 = document.createElement('td');
              cell2.textContent = countryCode + lines[j].trim();

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
              openContainer.style.display = 'none';
          }
          document.querySelector('.inputfeld').innerHTML = ''
      });
  });

  // Delete numbers
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
