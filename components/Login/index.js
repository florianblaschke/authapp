import { StyledForm, Slabel, Sinput, Sbutton } from "@/components/Form/Form";
import { signIn } from "next-auth/react";

export default function Login() {
  async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);

    const status = await signIn("credentials", {
      redirect: false,
      mail: data.mail,
      password: data.password,
      callbackUrl: "/",
    });

    console.log(status);
  }
  return (
    <StyledForm onSubmit={onLogin}>
      <Slabel htmlFor="mail">Enter your E-Mail Adress:</Slabel>
      <Sinput type="email" id="mail" name="mail" />
      <Slabel htmlFor="password">Enter your password:</Slabel>
      <Sinput type="text" id="password" name="password" />
      <Sbutton>Login</Sbutton>
    </StyledForm>
  );
}
