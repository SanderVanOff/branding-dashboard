<template>
  <FormulateForm class="login-form" v-model="formValues">
    <div>
      <img
        src="https://taximaxim.com/images/logo_nr.svg"
        style="max-height: 50px; max-width: 100px"
      />
      <span class="logo-text">branding</span>
    </div>
    <h2 class="form-title">Регистрация</h2>
    <FormulateInput
      name="email"
      type="email"
      label="Ваш Email"
      element-class="form-input__field"
      placeholder="Введите Email"
      validation="required|email"
    />

    <FormulateInput
      name="password"
      type="password"
      label="Пароль"
      class="mb-5"
      element-class="form-input__field"
      placeholder="Придумай пароль"
      validation="required"
    />

    <div class="form__actions">
      <router-link :to="{ name: 'Login' }">Войти?</router-link>
      <FormulateInput
        type="submit"
        label="Регистрация"
        element-class="form-input__field"
        @click="submit"
      />
    </div>
  </FormulateForm>
</template>

<script>
export default {
  data() {
    return {
      formValues: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch("registerNewUser", {
          email: this.formValues.email,
          password: this.formValues.password,
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.logo-text {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
}
.login-form {
  background: #fff;
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: 0.5em;
  max-width: 500px;
  box-sizing: border-box;
  width: 500px;
}
.form-title {
  margin-top: 0;
  margin-bottom: 2rem;
}
h2 {
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaecef;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
.form__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-input__field {
  max-width: 100% !important;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - 0.5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: 0.5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: 0.5em;
  }
}
</style>