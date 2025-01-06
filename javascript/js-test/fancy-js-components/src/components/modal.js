function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    return {
        open: function(content) {
            modalBody.innerHTML = content;
            modal.style.display = 'block';
        },
        close: function() {
            modal.style.display = 'none';
        }
    };
}

export { createModal };