const btn_menu = document.querySelector('.btn-menu');
const form = document.getElementById('contacto');
const spinner = document.getElementById("spinner");

btn_menu.addEventListener('click', () => {
    const span = btn_menu.firstChild;
    span.classList.toggle('fa-close');
    const menu_lista = document.querySelector('.menu-lista');
    menu_lista.classList.toggle('mostrar');
})

const validForm = ()=>{
    if((form.nombre_apellido.value.match(/^\s*$/) || []).length > 0 ){
        mensaje('Nos dejas tu nombre', true)
        return false;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value))){
        mensaje('Parece que el correo ingresado no es valido', true)
        return false;
    }
    if(form.description.value === ''){
        mensaje('Nos podes contar el  motivo de contacto?', true)
        return false;
    }
    return true;
}

const mensaje =(title, isError = false)=>{
    const mensaje = {
        title: title,
        icon: isError ? 'error' : 'success',
        confirmButtonColor: isError ? 'red' : '#EE9C44',
    }
    Swal.fire(mensaje).then(()=>{
        spinner.setAttribute('hidden', '');
    })
}

form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    if (validForm()){
        spinner.removeAttribute('hidden');
        const data = new FormData(e.target);
        const respuesta = await fetch(e.target.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if(respuesta.ok){
            mensaje('Se envió la informacion!', false)
            contactoForm.reset();
        }
    }
    spinner.setAttribute('hidden', '');
})

