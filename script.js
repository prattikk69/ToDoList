        const inputTask = document.getElementById('inputTask');
        const addTask = document.getElementById('addTask');
        const taskList = document.getElementById('taskList');
        const deleteAllTask = document.getElementById('deleteAllTask');

        // ── Storage helpers ──────────────────────────────────────────────────────
        function saveToStorage() {
            const items = [...taskList.querySelectorAll('li')].map(li => ({
                text: li.querySelector('p').textContent,
                completed: li.querySelector('p').classList.contains('completed')
            }));
            localStorage.setItem('list', JSON.stringify(items));
        }

        function loadFromStorage() {
            const raw = localStorage.getItem('list');
            if (!raw) return;
            try {
                const items = JSON.parse(raw);
                items.forEach(({ text, completed }) => createTaskElement(text, completed));
            } catch (e) {
                // Corrupt data — start fresh
                localStorage.removeItem('list');
            }
        }

        // ── DOM builder ──────────────────────────────────────────────────────────
        function createTaskElement(text, completed = false) {
            const li            = document.createElement('li');
            const liDiv         = document.createElement('div');
            const taskStatus    = document.createElement('i');
            const p             = document.createElement('p');
            const deleteIcon    = document.createElement('i');

            liDiv.style.cssText = 'display:flex; align-items:center; position:relative;';
            p.textContent = text;
            p.style.cursor = 'pointer';

            deleteIcon.className = 'far fa-trash-can';
            deleteIcon.style.cssText = 'position:absolute; right:0;';

            if (completed) {
                p.classList.add('completed');
                taskStatus.className = 'fas fa-check';
                taskStatus.style.color = 'limegreen';
            } else {
                taskStatus.className = 'fas fa-xmark';
                taskStatus.style.color = 'red';
            }

            // Toggle completion
            [p, taskStatus].forEach(el => {
                el.addEventListener('click', () => {
                    p.classList.toggle('completed');
                    const done = p.classList.contains('completed');
                    taskStatus.classList.replace(done ? 'fa-xmark' : 'fa-check', done ? 'fa-check' : 'fa-xmark');
                    taskStatus.style.color = done ? 'limegreen' : 'red';
                    saveToStorage();
                });
            });

            // Delete single task
            deleteIcon.addEventListener('click', () => {
                deleteIcon.classList.replace('fa-trash-can', 'fa-circle-check');
                setTimeout(() => {
                    li.remove();
                    checkTask();
                    saveToStorage();
                }, 500);
            });

            liDiv.append(taskStatus, p, deleteIcon);
            li.appendChild(liDiv);
            taskList.appendChild(li);
        }

        // ── Add task ─────────────────────────────────────────────────────────────
        function addTheTask() {
            const value = inputTask.value.trim();
            if (!value) {
                alert('Task cannot be empty.');
                return;
            }
            createTaskElement(value);
            inputTask.value = '';
            checkTask();
            saveToStorage();
        }

        // ── Empty-state indicator ────────────────────────────────────────────────
        function checkTask() {
            const existing = taskList.querySelector('span.empty-msg');
            if (taskList.querySelectorAll('li').length < 1) {
                if (!existing) {
                    const piDiv = document.createElement('span');
                    piDiv.className = 'empty-msg';
                    const i = document.createElement('i');
                    const p = document.createElement('p');
                    i.className = 'fas fa-ban';
                    i.style.color = 'rgba(0,0,0,0.4)';
                    p.style.cssText = 'color:rgba(0,0,0,0.4); display:inline-block;';
                    i.style.display = 'inline-block';
                    p.textContent = 'No task available right now.';
                    piDiv.append(i, p);
                    taskList.appendChild(piDiv);
                }
            } else {
                existing && existing.remove();
            }
        }

        // ── Event listeners ──────────────────────────────────────────────────────
        addTask.addEventListener('click', addTheTask);

        deleteAllTask.addEventListener('click', () => {
            taskList.innerHTML = '';
            checkTask();
            saveToStorage();
        });

        window.addEventListener('keydown', e => {
            if (e.key === 'Enter') addTheTask();
        });

        function setFocus() {
            inputTask.focus();
        }

        // ── Init ─────────────────────────────────────────────────────────────────
        window.addEventListener('load', () => {
            loadFromStorage();
            checkTask();
            setTimeout(()=>{
                // setFocus();
            },3000)
            putName();
            if(user.textContent == "User"){
                getName();
            }
        });

        //-----User Name-------------------------------------------------------------------------
        const user = document.querySelector('.user');
        const nameInput = document.getElementById('nameInput');
        const nameBtn = document.getElementById('nameBtn');
        const nameBox = document.querySelector('.name');

        function getName(){
        nameBox.classList.add('show');
        nameInput.focus();
    }
    function putName(){
    const stored = localStorage.getItem("userNameStore");
    user.textContent = stored ? stored : "User";
}

    function setName(){
        if(nameInput.value == ""){
            localStorage.setItem("userNameStore", "User");
        } else {
            localStorage.setItem("userNameStore", nameInput.value);
        }

        user.textContent = localStorage.getItem("userNameStore");
        nameInput.value = "";
        nameBox.classList.remove('show');
    }

    nameBtn.addEventListener("click", setName);

    user.addEventListener("click", getName);
    function cancel(){
        nameBox.classList.remove('show');
    }
