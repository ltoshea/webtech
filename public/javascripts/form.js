//var messageDelay = 2000;  // How long to display status messages (in milliseconds)

$( init );
// Initialize the form

function init() {
  var messageDelay = 2000;

  // Hide the form initially.
  // Make submitForm() the form's submit handler.
  // Position the form so it sits in the centre of the browser window.
  $('#contactForm').hide().submit( submitForm ).addClass( 'positioned' );

  $('a[href="#contactForm"]').click( function() {
    $('#container').fadeTo( 'slow', .2 );
    $('#contactForm').fadeIn( 'slow', function() {
      $('#senderName').focus();
    } )

    return false;
  } );
  
  // When the "Cancel" button is clicked, close the form
  $('#cancel').click( function() { 
    $('#contactForm').fadeOut();
    $('#container').fadeTo( 'slow', 1 );
  } );  

  // When the "Escape" key is pressed, close the form
  $('#contactForm').keydown( function( event ) {
    if ( event.which == 27 ) {
      $('#contactForm').fadeOut();
      $('#container').fadeTo( 'slow', 1 );
    }
  } );

}


function submitForm() {
  var messageDelay = 2000;
  var contactForm = $(this);
 
  // Are all the fields filled in?
 
  if ( !$('#senderName').val() || !$('#senderEmail').val() || !$('#message').val() ) {
 
    // No; display a warning message and return to the form
    $('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
    contactForm.fadeOut().delay(messageDelay).fadeIn();
 
  } else {
 
    // Yes; submit the form to the PHP script via Ajax
 
    $('#sendingMessage').fadeIn();
    contactForm.fadeOut();
 
    $.ajax( {
      url: contactForm.attr( 'action' ) + "?ajax=true",
      type: contactForm.attr( 'method' ),
      data: contactForm.serialize(),
      success: submitFinished
    } );
  }
 
  // Prevent the default form submission occurring
  return false;
}


// Handle the Ajax response

// Handle the Ajax response
 
function submitFinished( response ) {
  var messageDelay = 2000;
  response = $.trim( response );
  $('#sendingMessage').fadeOut();
 
  if ( response == "success" ) {
 
    // Form submitted successfully:
    // 1. Display the success message
    // 2. Clear the form fields
    // 3. Fade the content back in
 
    $('#successMessage').fadeIn().delay(messageDelay).fadeOut();
    $('#senderName').val( "" );
    $('#senderEmail').val( "" );
    $('#message').val( "" );
 
    $('#container').delay(messageDelay+500).fadeTo( 'slow', 1 );
 
  } else {
 
    // Form submission failed: Display the failure message,
    // then redisplay the form
    $('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
    $('#contactForm').delay(messageDelay+500).fadeIn();
  }
}
