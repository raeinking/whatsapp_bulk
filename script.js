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
  
    // var addButtons = document.getElementsByClassName('dt-add');
    // for (var i = 0; i < addButtons.length; i++) {
    //     addButtons[i].addEventListener('click', function() {
    //         var rowData = [];
    //         var info = dataTable.page.info();
    //         rowData.push(info.recordsTotal+1);
    //         rowData.push('New Order');
    //         var cellContent = document.createElement('div');
    //         cellContent.innerHTML = '<textarea class="form-control"></textarea>' +
    //                                 '<button type="button" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>' +
    //                                 '<button type="button" class="btn btn-danger btn-xs dt-delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>';
    //         rowData.push(cellContent);
    //         dataTable.row.add(rowData).draw(false);
    //     });
    // }

    var addButtons = document.getElementsByClassName('dt-add');
    var rowCounter = 1; // Initialize row counter
    
    var addButtons = document.getElementsByClassName('dt-add');
    var rowCounter = 1; // Initialize row counter
    
    for (var i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', function() {
            var inputvalue = document.getElementsByClassName('inputfeld')[0].value;
            // Check if input value is empty or contains only whitespace
            if (!inputvalue.trim()) {
                return; // Exit function if input value is empty
            }
            
            var lines = inputvalue.split('\n');
            
            for (var j = 0; j < lines.length; j++) {
                var newRow = document.createElement('tr');
    
                var cell1 = document.createElement('td');
                cell1.textContent = rowCounter++; // Increment row counter for each new row
    
                var cell2 = document.createElement('td');
                cell2.textContent = lines[j].trim();
    
                var cell3 = document.createElement('td');
                cell3.classList.add('text-center');
    
                var editButton = document.createElement('button');
                editButton.setAttribute('type', 'button');
                editButton.classList.add('btn', 'btn-primary', 'btn-xs', 'dt-edit');
                editButton.style.marginRight = '16px';
                var editSpan = document.createElement('span');
                editSpan.classList.add('glyphicon', 'glyphicon-pencil');
                editButton.appendChild(editSpan);
    
                var deleteButton = document.createElement('button');
                deleteButton.setAttribute('type', 'button');
                deleteButton.classList.add('btn', 'btn-danger', 'btn-xs', 'dt-delete');
                var deleteSpan = document.createElement('span');
                deleteSpan.classList.add('glyphicon', 'glyphicon-remove');
                deleteButton.appendChild(deleteSpan);
    
                cell3.appendChild(editButton);
                cell3.appendChild(deleteButton);
    
                newRow.appendChild(cell1);
                newRow.appendChild(cell2);
                newRow.appendChild(cell3);
    
                dataTable.row.add(newRow).draw(false);
            }
        });
    }
    
    
    
    
    
    var editButtons = document.getElementsByClassName('dt-edit');
    for (var i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', function(evt) {
        var dtRow = evt.target.closest('tr');
        var modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';
        modalBody.innerHTML += 'Row index: ' + dtRow.rowIndex + '<br/>';
        modalBody.innerHTML += 'Number of columns: ' + dtRow.cells.length + '<br/>';
        for (var i = 0; i < dtRow.cells.length; i++) {
          modalBody.innerHTML += 'Cell (column, row) ' + dtRow.cells[i].cellIndex + ', ' + dtRow.rowIndex + ' => innerHTML : ' + dtRow.cells[i].innerHTML + '<br/>';
        }
        document.getElementById('myModal').classList.add('show');
        document.getElementById('myModal').style.display = 'block';
      });
    }
  
    var deleteButtons = document.getElementsByClassName('dt-delete');
    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', function(evt) {
        var dtRow = evt.target.closest('tr');
        if (confirm("Are you sure to delete this row?")) {
          dataTable.row(dtRow).remove().draw(false);
        }
      });
    }
  
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
  