import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-flow: column wrap;
  width: 25%;
  text-align: left;
  padding: 20px;
  background-color: grey;
  border-radius: 8px;
`;

const Slabel = styled.label`
  padding: 15px 15px 15px 0px;
  font-weight: thin;
`;

const Sinput = styled.input`
  height: 30px;
  border-radius: 8px;
  border: solid thin grey;
`;

const Sbutton = styled.button`
  width: 128px;
  padding: 8px;
  margin: 16px;
  border-radius: 8px;
  cursor: pointer;
  background-color: white;
  color: grey;
  align-self: center;
`;

async function createUser(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const res = await fetch("/api/auth/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    console.log("New user created");
  } else {
    console.log(res);
  }
}

export default function Form() {
  return (
    <>
      <StyledForm onSubmit={createUser}>
        <Slabel htmlFor="name">Enter your name:</Slabel>
        <Sinput type="text" id="name" name="name" />
        <Slabel htmlFor="mail">Enter your E-Mail Adress:</Slabel>
        <Sinput type="email" id="mail" name="mail" />
        <Slabel htmlFor="password">Enter your password:</Slabel>
        <Sinput type="text" id="password" name="password" />
        <Sbutton>Hello</Sbutton>
      </StyledForm>
    </>
  );
}
