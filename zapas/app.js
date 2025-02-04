
const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const product = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
  {
    id: 6,
    title: "Jordan Air 1 Low",
    price: 89,
    colors: [
      {
        code: "blue",
        img: "./img/jordan1_low.jpg",
      },
      {
        code: "purple",
        img: "./img/purple.webp",
      },
    ],
  },
  {
    id: 7,
    title: "KAWS",
    price: 2100,
    colors: [
      {
        code: "black",
        img: "./img/Jordan4.png",
      },
      {
        code: "white",
        img: "",
      },
    ],
  },
];

let choosenProduct = product[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = product[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});
// Referencias al modal y sus elementos
const loginModal = document.getElementById("loginModal");
const openLoginModal = document.getElementById("openLoginModal");
const closeModal = document.querySelector(".closeModal");
const loginForm = document.getElementById("loginForm");

// Mostrar el pago al hacer clic en el botón
openLoginModal.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

// Ocultar el pago al hacer clic en la "X"
closeModal.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Cerrar el pago si se hace clic fuera de él
window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});

// Lógica para gestionar el inicio de sesión
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar recargar la página
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Aquí puedes validar las credenciales (lógica del servidor)
    if (username === "admin" && password === "1234") { // Ejemplo básico
        alert("Inicio de sesión exitoso");
        loginModal.style.display = "none";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});
function toggleMenu() {
  const navBottom = document.querySelector(".navBottom");
  navBottom.classList.toggle("active");
}