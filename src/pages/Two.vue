<script setup>
import { useRouter } from "vue-router";
import FooterComp from "../components/FooterComp.vue";
import HeaderComp from "../components/HeaderComp.vue";
import MenuItemComp from "../components/MenuItemComp.vue";
import SidebarComp from "../components/SidebarComp.vue";
import InputComp from "../components/InputComp.vue";
import { ref, computed, onMounted } from "vue";


const router = useRouter();


const title = ref("Two")
const colors = ref(["red", "blue", "black", "green", "brown", "purple"]);
const names = ref(["", "", "", "", ""]);
const globalColorName = ref("");
const submitDisabled = ref(true);

onMounted(()=>{
  globalColorName.value =  JSON.parse(localStorage.getItem("color-two"))
})

const clickItem = (colorName) => {
  globalColorName.value = colorName;
  localStorage.setItem("color-two", JSON.stringify(globalColorName.value));
};


const updateName = (i, value) => {
  names.value[i] = value;
  submitDisabled.value = Object.values(names.value).some((val) => !val);
};

const submitForm = () => {
  const allValuesFilled = Object.values(names.value).every((val) => val);
  submitDisabled.value = !allValuesFilled;
  router.push("/");
  title.value = "One"
};

const resetForm = () => {
  names.value = ["", "", "", "", ""];
  globalColorName.value = ""
  submitDisabled.value = true;
  localStorage.removeItem("color-two")
};



const isSubmitDisabled = computed(() => {
  return submitDisabled.value;
});

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
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 5%;
  background-color: rgb(160, 160, 160);
  align-items: center;
  justify-items: center;
}

.footer {
  width: 100%;
  height: 5%;
  background-color: rgb(160, 160, 160);
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
}

.main {
  width: 100%;
  height: 90%;
  background-color: rgb(193, 233, 233);
  display: grid;
  position: relative;
}

.main .sidebar {
  width: 5%;
  height: 90%;
  background-color: rgb(160, 160, 160);
  display: grid;
  justify-items: center;
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
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: start;
  align-items: start;
}

.content__form .menuItem {
  width: 60%;
  display: grid;
  grid-template-columns: 1fr;
}

.content__form .button__form {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 2vh;
}
.button__form form {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  grid-gap: 2vh;
}

form div {
  width: 100%;
}

form h1 {
  background-color: rgb(160, 160, 160);
  width: 100%;
  height: 5vh;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 2vw;
}

.button__form .buttons {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-items: space-between;
  align-items: center;
  grid-gap: 40px;
}

.buttons button {
  width: 100%;
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
  background-color: purple;
}
</style>
