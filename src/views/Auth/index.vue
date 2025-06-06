<script setup>
import { ref, onMounted } from "vue";
import { register, login } from "@/apis/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

// 显示/隐藏密码
const togglePasswordVisibility = (inputId, iconId) => {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input && icon) {
    icon.addEventListener("click", () => {
      // 切换密码类型
      input.type = input.type === "password" ? "text" : "password";
      // 切换图标
      icon.classList.toggle("ri-eye-fill");
      icon.classList.toggle("ri-eye-off-fill");
    });
  }
};

// 切换登录/注册视图
const showRegister = ref(false);
const switchToRegister = () => (showRegister.value = true);
const switchToLogin = () => (showRegister.value = false);

onMounted(() => {
  togglePasswordVisibility("password", "loginPassword");
  togglePasswordVisibility("passwordCreate", "loginPasswordCreate");
});

const LoginSubmit = (event) => {
  event.preventDefault();
  console.log("LoginSubmit");
  // 表单验证
  const username = document.getElementById("text").value;
  const password = document.getElementById("password").value;
  if (username === "" || password === "") {
    ElMessage.error("Please fill in all fields");
    return;
  }

  // 调用登录接口
  login({ username, password })
    .then((response) => {
      ElMessage.success("Login successful");
      localStorage.setItem("user_name", response.data.username);
      router.push("/");
    })
    .catch((error) => {
      if (error.response.status === 401) {
        ElMessage.error("Incorrect username or password");
      } else {
        ElMessage.error("服务器错误，请稍后再试");
      }
    });
  localStorage.setItem("use-auth", true);
};

const registerSubmit = (event) => {
  event.preventDefault();
  // console.log("registerSubmit");
  // 表单验证
  const username = document.getElementById("textCreate").value;
  const password = document.getElementById("passwordCreate").value;
  if (username === "" || password === "") {
    ElMessage.error("Please fill in all fields");
    return;
  }

  // 调用注册接口
  register({ username, password })
    .then((response) => {
      ElMessage.success("Registration successful");
      switchToLogin();
    })
    .catch((error) => {
      console.log("error");

      if (error.response.status === 400) {
        ElMessage.error("Username already exists");
      } else {
        ElMessage.error("服务器错误，请稍后再试");
      }
    });
};
</script>

<template>
  <!--=============== LOGIN IMAGE ===============-->
  <svg
    class="login__blob"
    viewBox="0 0 566 840"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="mask0" mask-type="alpha">
      <path
        d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
           0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
           591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
           167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"
      />
    </mask>

    <g mask="url(#mask0)">
      <path
        d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
           0H566V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
           591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
           167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z"
      />
    </g>
  </svg>

  <!--=============== LOGIN ===============-->
  <div
    class="login container grid"
    :class="{ active: showRegister }"
    id="loginAccessRegister"
  >
    <!--===== LOGIN ACCESS =====-->
    <div class="login__access">
      <h1 class="login__title">Log in to your account.</h1>

      <div class="login__area">
        <form action="" class="login__form">
          <div class="login__content grid">
            <div class="login__box">
              <input
                type="text"
                id="text"
                required
                placeholder=" "
                class="login__input"
              />
              <label for="text" class="login__label">Account</label>
              <i class="ri-id-card-fill login__icon"></i>
            </div>

            <div class="login__box">
              <input
                type="password"
                id="password"
                required
                placeholder=" "
                class="login__input"
              />
              <label for="password" class="login__label">Password</label>
              <i
                class="ri-eye-off-fill login__icon login__password"
                id="loginPassword"
              ></i>
            </div>
          </div>

          <button class="login__button" @click="LoginSubmit">Login</button>
        </form>

        <p class="login__switch">
          Don't have an account?
          <button @click="switchToRegister">Create Account</button>
        </p>
      </div>
    </div>

    <!--===== LOGIN REGISTER =====-->
    <div class="login__register">
      <h1 class="login__title">Create new account.</h1>

      <div class="login__area">
        <form action="" class="login__form">
          <div class="login__content grid">
            <div class="login__box">
              <input
                type="text"
                id="textCreate"
                required
                placeholder=" "
                class="login__input"
              />
              <label for="textCreate" class="login__label">Account</label>
              <i class="ri-id-card-fill login__icon"></i>
            </div>

            <div class="login__box">
              <input
                type="password"
                id="passwordCreate"
                required
                placeholder=" "
                class="login__input"
              />
              <label for="passwordCreate" class="login__label">Password</label>
              <i
                class="ri-eye-off-fill login__icon login__password"
                id="loginPasswordCreate"
              ></i>
            </div>
          </div>

          <button class="login__button" @click="registerSubmit">
            Create account
          </button>
        </form>

        <p class="login__switch">
          Already have an account?
          <button @click="switchToLogin">Log In</button>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
/*=============== VARIABLES CSS ===============*/
:root {
  /*========== Colors ==========*/
  /*Color mode HSL(hue, saturation, lightness)*/
  --first-color: hsl(208, 92%, 54%);
  --first-color-alt: hsl(208, 88%, 50%);
  --title-color: hsl(220, 68%, 4%);
  --white-color: hsl(0, 0%, 100%);
  --text-color: hsl(220, 15%, 66%);
  --body-color: hsl(0, 0%, 100%);
  --container-color: hsl(220, 50%, 97%);

  /*========== Font and typography ==========*/
  /*.5rem = 8px | 1rem = 16px ...*/
  --body-font: "Montserrat", system-ui;
  --big-font-size: 1.5rem;
  --normal-font-size: 0.938rem;
  --small-font-size: 0.813rem;
  --tiny-font-size: 0.688rem;

  /*========== Font weight ==========*/
  --font-regular: 400;
  --font-medium: 500;
  --font-semi-bold: 600;

  /*========== z index ==========*/
  --z-tooltip: 10;
  --z-fixed: 100;
}

/*========== Responsive typography ==========*/
@media screen and (min-width: 1150px) {
  :root {
    --big-font-size: 3rem;
    --normal-font-size: 1rem;
    --small-font-size: 0.875rem;
    --tiny-font-size: 0.75rem;
  }
}

/*=============== BASE ===============*/
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body,
input,
button {
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
}

body {
  background-color: var(--body-color);
  color: var(--text-color);
}

input,
button {
  border: none;
  outline: none;
}

a {
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

/*=============== REUSABLE CSS CLASSES ===============*/
.container {
  max-width: 1120px;
  margin-inline: 1.5rem;
}

.grid {
  display: grid;
  gap: 1rem;
}

/*=============== LOGIN  ===============*/
.login {
  position: relative;
  height: 100vh;
  align-items: center;
  overflow: hidden;
}

.login__blob {
  display: none;
}

.login__title {
  font-size: var(--big-font-size);
  color: var(--title-color);
  text-align: center;
  margin-bottom: 2rem;
}

.login__box {
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--container-color);
  border-radius: 1rem;
}

.login__input {
  background: none;
  width: 100%;
  padding: 1.5rem 2.5rem 1.5rem 1.25rem;
  font-weight: var(--font-semi-bold);
  border: 3px solid transparent;
  border-radius: 1rem;
  z-index: 1;
  transition: border-color 0.4s;
}

.login__input:autofill {
  transition: background-color 6000s, color 6000s;
}

.login__label {
  position: absolute;
  left: 1.25rem;
  font-weight: var(--font-semi-bold);
  transition: transform 0.4s, font-size 0.4s, color 0.4s;
}

.login__icon {
  position: absolute;
  right: 1rem;
  font-size: 1.25rem;
  transition: color 0.4s;
}

.login__password {
  cursor: pointer;
  z-index: 10;
}

.login__forgot {
  display: block;
  width: max-content;
  margin: 1rem 0 0 auto;
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--text-color);
  transition: color 0.4s;
}

.login__forgot:hover {
  color: var(--first-color);
}

.login__button {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  background-color: var(--first-color);
  color: var(--white-color);
  font-weight: var(--font-semi-bold);
  padding-block: 1.5rem;
  border-radius: 4rem;
  margin-block: 2rem;
  cursor: pointer;
  transition: background-color 0.4s, box-shadow 0.4s;
}

.login__button:hover {
  background-color: var(--first-color-alt);
  box-shadow: 0 8px 24px hsla(208, 92%, 32%, 0.3);
}

.login__social {
  margin-bottom: 2rem;
}

.login__social-title {
  text-align: center;
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
  margin-bottom: 1rem;
}

.login__social-img {
  width: 1rem;
}

.login__social-links {
  display: flex;
  justify-content: center;
  column-gap: 1.5rem;
}

.login__social-link {
  width: 32px;
  height: 32px;
  background-color: var(--body-color);
  box-shadow: 0 4px 8px hsla(0, 0%, 0%, 0.1);
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  transition: transform 0.4s;
}

.login__social-link:hover {
  transform: translateY(-0.25rem);
}

.login__switch {
  text-align: center;
  font-size: var(--small-font-size);
}

.login__switch button {
  background: none;
  color: var(--first-color);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  cursor: pointer;
  transition: color 0.4s;
}

.login__switch button:hover {
  color: var(--first-color-alt);
}

.login__access,
.login__register {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  transition: transform 0.4s, opacity 0.4s 0.1s;
}

.login__register {
  transform: translateX(15rem);
  opacity: 0;
  pointer-events: none;
}

/* Input focus move up label */
.login__input:focus ~ .login__label {
  transform: translateY(-12px);
  font-size: var(--tiny-font-size);
}

.login__input:focus {
  padding-block: 2rem 1rem;
}

/* Input focus sticky top label */
.login__input:not(:placeholder-shown).login__input:not(:focus) ~ .login__label {
  transform: translateY(-12px);
  font-size: var(--tiny-font-size);
}

.login__input:not(:placeholder-shown).login__input:not(:focus) {
  padding-block: 2rem 1rem;
}

/* Input focus color */
.login__input:focus {
  border-color: var(--first-color);
}

.login__input:focus ~ .login__label,
.login__input:focus ~ .login__icon {
  color: var(--first-color);
}

/* Show hide login & create account */
.active .login__access {
  transform: translateX(15rem);
  opacity: 0;
  pointer-events: none;
}

.active .login__register {
  transform: translateX(0);
  opacity: 1;
  pointer-events: initial;
}

/*=============== BREAKPOINTS ===============*/
/* For small devices */
@media screen and (max-width: 320px) {
  .container {
    margin-inline: 1rem;
  }
}

/* For medium devices */
@media screen and (min-width: 540px) {
  .login__area {
    width: 380px;
    margin-inline: auto;
  }
}

@media screen and (min-width: 350px) and (max-height: 600px) {
  .login {
    height: 760px;
  }
}

/* For large devices */
@media screen and (min-width: 1150px) {
  .container {
    margin-inline: auto;
  }

  .login__area {
    width: 460px;
    margin: initial;
  }
  .login__access,
  .login__register {
    width: 600px;
  }
  .login__title {
    text-align: initial;
    margin-bottom: 3rem;
  }
  .login__button {
    margin-bottom: 3rem;
  }
  .login__group {
    grid-template-columns: repeat(2, 1fr);
  }
  .login__blob {
    display: block;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
  }
  .login__img {
    transform: translate(0rem, 0rem);
  }
}
</style>