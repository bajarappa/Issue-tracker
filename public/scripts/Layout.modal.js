document.addEventListener('DOMContentLoaded', function () {
    var newProjectBtn = document.getElementById('newProjectBtn');
    var newProjectModal = document.getElementById('newProjectModal');
    var closeModal = document.getElementById('closeModal');

    newProjectBtn.addEventListener('click', function () {
        newProjectModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        newProjectModal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (event.target == newProjectModal) {
            newProjectModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var newProjectBtn = document.getElementById('newIssueBtn');
    // newProjectBtn.style.backgroundColor="red";
    var newProjectModal = document.getElementById('newProjectModal2');
    var closeModal = document.getElementById('closeModal2');

    newProjectBtn.addEventListener('click', function () {
        newProjectModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        newProjectModal.style.display = 'none';
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (event.target == newProjectModal) {
            newProjectModal.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    let resoleSolvedAns = false;
    const resoleSolved = document.getElementById("resoleSolved");

    if (resoleSolved) {
        resoleSolved.addEventListener('click', () => {
            if (resoleSolvedAns) {
                resoleSolved.style.backgroundColor = '#d9534f';
                resoleSolved.innerText = 'Resolve';

            } else {
                resoleSolved.style.backgroundColor = 'green';
                resoleSolved.innerText = 'Resolved';
            }
            resoleSolvedAns = !resoleSolvedAns;
        });
    } else {
        console.error("Element with ID 'resoleSolved' not found.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // JavaScript for filter modal
    const filterBtn = document.getElementById('filterBtn');
    const filterModal = document.getElementById('filterModal3');
    const closeFilterModal = document.getElementById('closeFilterModal3');

    filterBtn.addEventListener('click', () => {
        filterModal.style.display = 'block';
    });

    closeFilterModal.addEventListener('click', () => {
        filterModal.style.display = 'none';
    });

    // Optional: Close the modal if the user clicks outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === filterModal) {
            filterModal.style.display = 'none';
        }
    });

    // Optional: Apply filter logic when the "Apply Filter" button is clicked
    const applyFilterBtn = document.getElementById('applyFilter');
    applyFilterBtn.addEventListener('click', () => {
        // Add logic to apply the selected filters
        filterModal.style.display = 'none'; // Close the modal after applying filters
    });
});


document.addEventListener('DOMContentLoaded', function () {
    var selectAllOptionsCheckbox = document.getElementById('selectAllOptions');
    var bugOptionsSelect = document.getElementById('bugOption');

    selectAllOptionsCheckbox.addEventListener('change', function () {
        var options = bugOptionsSelect.options;

        for (var i = 0; i < options.length; i++) {
            options[i].selected = selectAllOptionsCheckbox.checked;
        }
    });
});