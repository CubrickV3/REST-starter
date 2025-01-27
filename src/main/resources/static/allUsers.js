const urlAdmin = '/api/admin';

async function getRoles() {
    return await fetch("/api/admin/roles")
        .then(response => response.json());
}

function listRoles() {
    let tmp = '';
    getRoles().then(roles =>
        roles.forEach(role => {
            tmp += `<option value="${role.id}">${role.roleName.substring(5)}</option>`;
        })
    ).then(() => {
        console.log('listRoles');
        document.getElementById('editRoles').innerHTML = tmp;
        document.getElementById('deleteRoles').innerHTML = tmp;
        document.getElementById('rolesNewUser').innerHTML = tmp;
    });
}

listRoles();

function getUsersData() {
    fetch(urlAdmin + '/users')
        .then(response => response.json())
        .then(data => loadTable(data))
}

function loadTable(listUsers) {
    let el = "";
    for (let user of listUsers) {
        el +=`
        <tr>
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.lastName}</td>
          <td>${user.age}</td>
          <td>${user.email}</td>
          <td>${user.roles ? user.roles.map(role => role.roleName.substring(5)).join(', ') : 'No roles'}</td>
          <td class="align-middle">
			 <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#userEdit">
				Edit
		     </button>
		  </td>
		  <td class="align-middle">
			  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#userDelete">
				 Delete
			  </button>
		  </td>
        </tr>`
    }
    document.getElementById("allUsers").innerHTML = el;
}

getUsersData();

document.getElementById("newUserForm").addEventListener('submit', (e) => {
    e.preventDefault();
    let role = document.getElementById("rolesNewUser");
    let rolesNewUser = [];
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesNewUser.push({id: role.options[i].value, roleName: 'ROLE_' + role.options[i].innerHTML});
        }
    }
    fetch('api/admin/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: document.getElementById("first_name").value,
            lastName: document.getElementById("last_name").value,
            age: document.getElementById("age").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            roles: rolesNewUser
        })
    }).then((response) => {
        if (response.ok) {
            getUsersData()
            document.getElementById("nav-home-tab").click();
        }
    });
});