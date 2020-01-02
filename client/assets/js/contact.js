const apiUrl = 'http://localhost:8080/'
let contactId;
$(document).ready(function () {
    generateContacts()
    $('#btnUpdate').click(function (e) { 
        e.preventDefault();
        const form = $('#contactForm').serialize()
        UpdateContact(form, contactId, (err, res) => {
            if (!err) {
                $('#contactModal').modal('hide')
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Added contact',
                    timer: 1000
                }) 
                generateContacts()    
            }else{
                console.log(err)
            }
        })
    });
    $('#btnAdd').click(function (e) { 
        e.preventDefault();
        const form = $('#contactForm').serialize()         
        AddContact(form, (err, res) => {
          if(!err){
            $('#contactModal').modal('hide')
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Added contact',
                timer: 1000
            }) 
            generateContacts()
          }else{
            console.log(err)
          }
        })
    });
});

const deleteContact = id => {
    contactId = id
    const generateList = generateContacts
    Swal.fire({
        title: 'Are you sure?',
        text: "You will delete this contact!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            DeleteContact(contactId, (err, res) => {
                if (!err) {
                    Swal.fire(
                        'Deleted!',
                        'this data has been deleted.',
                        'success'
                    )      
                    $(`#contact-${contactId}`).remove()
                }else{
                    console.log(err)
                }
            })
        }
    })

}

const contactModal = (id) => {
    clearForm()
    if(id){
        contactId = id
        $('#btnUpdate').show()
        $('#btnAdd').hide()
        Contact(contactId, (err, res) => {
            const contact = res.contact
            $('#name').val(contact.name)
            $('#phone').val(contact.phone)
        })
    }else{
        $('#btnAdd').show()
        $('#btnUpdate').hide()
    }
    $('#contactModal').modal('show')
}

const clearForm = () => {
    $('#name').val(null)
    $('#phone').val()
}

const generateContacts = () => {
    Contacts((err, res) => {
        const contacts = res.contacts
        contacts.forEach((contact, i) => {
            let html = `
                <div class="col-12 col-lg-3 mb-3 contact" style="display: none;" id="contact-${contact.id}">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${contact.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${contact.phone}</h6>
                            <div class="p-2">
                                <a href="javascript:void(0)" class="btn btn-sm btn-outline-info" onclick="contactModal(${contact.id})"><i class="fas fa-edit"></i></a>
                                <a href="javascript:void(0)" class="btn btn-sm btn btn-outline-danger " onclick="deleteContact(${contact.id})"><i class="fas fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            $('#contacts').append(html)
            $(`#contact-${contact.id}`).delay(800).fadeIn(400);
        });
        
    })
}

const Contacts  = (cb) => {
    $.ajax({
        type: "GET",
        url: apiUrl+'contact'
    })
    .done(contacts => {
        cb(null, contacts)
    })
    .fail(errs => {
        cb(errs)
    })
}
const Contact = (id, cb) => {
    $.ajax({
        type: "GET",
        url: apiUrl+'contact/'+id
    })
    .done(contact => {
        cb(null, contact)
    })
    .fail(errs => {
        cb(errs)
    })
}
const AddContact = (form, cb) => {
    $.ajax({
        type: "POST",
        url: apiUrl+'contact',
        data: form
    })
    .done(contact => {
        cb(null, contact)
    })
    .fail(errs => {
        cb(errs)
    })
}
const UpdateContact = (form, id, cb) => {
    $.ajax({
        type: "PUT",
        url: apiUrl+'contact/'+id,
        data: "form",
        dataType: "json"
    })
    .done(contact => {
        cb(null, contact)
    })
    .fail(errs => {
        cb(errs)
    })
}
const DeleteContact = (id, cb) => {
    $.ajax({
        type: "DELETE",
        url: apiUrl+'contact/'+id
    })
    .done(contact => {
        cb(null, contact)
    })
    .fail(errs => {
        cb(errs)
    })
}