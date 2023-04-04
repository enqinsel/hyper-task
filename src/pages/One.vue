<script setup>
import { useRouter } from "vue-router";
import FooterComp from "../components/FooterComp.vue";
import HeaderComp from "../components/HeaderComp.vue";
import MenuItemComp from "../components/MenuItemComp.vue";
import SidebarComp from "../components/SidebarComp.vue";
import InputComp from "../components/InputComp.vue";
import { ref, computed, onMounted } from "vue";

// to go to page One and Two
const router = useRouter();

// variables
const title = ref("One");
const colors = ref(["red", "blue", "black", "green", "brown", "purple"]);
const names = ref(["", "", "", "", ""]);
const submitDisabled = ref(true);

// when page loads
onMounted(() => {
  globalColorName.value = JSON.parse(localStorage.getItem("color-one"));
});

// I defined a global variable like state management so I can influence everywhere
const globalColorName = ref("");

// after click menu item buttons
const clickItem = (colorName) => {
  globalColorName.value = colorName;
  localStorage.setItem("color-one", JSON.stringify(globalColorName.value));
};

// submit validation and names update
const updateName = (i, value) => {
  names.value[i] = value;
  submitDisabled.value = Object.values(names.value).some((val) => !val);
};

// after click submit button
const submitForm = () => {
  const allValuesFilled = Object.values(names.value).every((val) => val);
  submitDisabled.value = !allValuesFilled;
  router.push("/two");
  title.value = "Two";
  globalColorName.value = JSON.parse(localStorage.getItem("color-one"));
};

// after click reset button
const resetForm = () => {
  names.value = ["", "", "", "", ""];
  globalColorName.value = "";
  submitDisabled.value = true;
  localStorage.removeItem("color-one");
};

// submit button control
const isSubmitDisabled = computed(() => {
  return submitDisabled.value;
});

// reset button validation
const resetDisabled = computed(() => {
  return Object.values(names.value).every((val) => !val);
});
</script>

<template>
  <div class="container">
    <div class="header" :class="globalColorName">
      <HeaderComp></HeaderComp>
    </div>
    <div class="main">
      <div class="content">
        <div class="content__form">
          <!-- Menu item start -->
          <div class="menuItem">
            <MenuItemComp
              v-for="(value, key) in colors"
              :color="value"
              :colorName="value"
              @clickHandler="clickItem"
            ></MenuItemComp>
          </div>
          <!-- Menu item end -->

          <!-- form fields start -->
          <div class="button__form">
            <form>
              <h1>{{ title }}</h1>
              <!-- ınputs can be increased because content div has overflow feauture-->
              <div v-for="i in 5" :key="i">
                <InputComp
                  v-model:name="names[i - 1]"
                  @input="(e) => updateName(i - 1, e.target.value)"
                ></InputComp>
              </div>
            </form>
            <div class="buttons">
              <button
                :disabled="resetDisabled"
                @click="resetForm"
                type="reset"
                class="resetButton"
                :class="globalColorName"
              >
                reset
              </button>
              <button
                :disabled="submitDisabled"
                @click="submitForm"
                type="submit"
                class="submitButton"
                :class="globalColorName"
              >
                submit
              </button>
            </div>
          </div>
          <!-- form fields end -->
        </div>
      </div>
      <div class="sidebar">
        <SidebarComp></SidebarComp>
      </div>
    </div>
    <div class="footer" :class="globalColorName">
      <FooterComp></FooterComp>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background: rgb(255, 255, 255);
  color: whitesmoke;
}

.header {
  width: 100%;
  height: 5%;
  background-color: rgb(160, 160, 160);
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer {
  width: 100%;
  height: 5%;
  background-color: rgb(160, 160, 160);
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  width: 100%;
  height: 90%;
  background-color: rgb(193, 233, 233);
  display: flex;
  position: relative;
}

.main .sidebar {
  width: 5%;
  height: 90%;
  background-color: rgb(160, 160, 160);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
}

.main .content {
  width: 80%;
  height: 100%;
  position: absolute;
  left: 15%;
  overflow: auto;
}

.content .content__form {
  width: 80%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 10%;
  display: flex;
  gap: 13%;
  justify-content: flex-start;
  align-items: flex-start;
}

.content__form .menuItem {
  width: 20%;
  display: flex;
  flex-direction: column;
}

.content__form .button__form {
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
}

.button__form form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
}

form div {
  width: 100%;
}

form h1 {
  background-color: rgb(160, 160, 160);
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
}

.button__form .buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.buttons button {
  width: 45%;
  height: 4vh;
  color: rgb(193, 192, 192);
}

button:disabled{
  filter: blur(2px);
}

input {
  width: 99%;
  height: 3vh;
  border: none;
}

button{
  cursor: pointer;
}

button:hover{
  transform: scale(1.2);
}

.red {
  background-color: red;
}

.black {
  background-color: black;
}

.green {
  background-color: green;
}

.blue {
  background-color: blue;
}

.brown{
  background-color: rgb(122, 50, 50);
}

.purple{
  background: purple;
}

</style>
