document.addEventListener("DOMContentLoaded", function() {
    // DataTable initialization
    var table = document.getElementById('example');
    var dataTable = new DataTable(table, {
      dom: '<"dt-buttons"Bf><"clear">lirtp',
      paging: false,
      autoWidth: true,
      columnDefs: [
        { orderable: false, targets: 5 }
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
  
    var addButtons = document.getElementsByClassName('dt-add');
    for (var i = 0; i < addButtons.length; i++) {
      addButtons[i].addEventListener('click', function() {
        var rowData = [];
        var info = dataTable.page.info();
        rowData.push(info.recordsTotal+1);
        rowData.push('New Order');
        rowData.push('<button type="button" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button type="button" class="btn btn-danger btn-xs dt-delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>');
        dataTable.row.add(rowData).draw( false );
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
  