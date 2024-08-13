const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const saltRounds = 10;

// Initialize user session
let UserSession = null;

// Sign up user
async function handleSignUp(userSignup) 
{
  let errorMessage = "";
  let usernameCheck = UsernamePolicyCheck(userSignup.username);
  let passwordCheck = PasswordPolicyCheck(userSignup.password);
  let emailCheck = EmailPolicyCheck(userSignup.email);

  // Check if username, password, and email meet requirements
  if (usernameCheck !== "Username is valid" || passwordCheck !== "Password is valid" || emailCheck !== "Email is valid") 
  {
    
    if (usernameCheck !== "Username is valid") 
    {
      errorMessage += `${usernameCheck}\n`;
    }
    
    if (passwordCheck !== "Password is valid") 
    {
      errorMessage += `${passwordCheck}\n`;
    }
    
    if (emailCheck !== "Email is valid") 
    {
      errorMessage += `${emailCheck}\n`;
    }
    return { error: errorMessage.trim() };
  }

  try 
  {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userSignup.password, salt);

    const newUser = await prisma.user.create({
      data: 
      {
        email: userSignup.email,
        username: userSignup.username,
        password: hashedPassword,
      },
    });

    // Create settings for the new user
    const settings = await prisma.setting.create({
      data: 
      {
        userId: newUser.id,
      },
    });

    return { message: "Registration successful", newUser };
  } 
  
  catch (error) 
  {
    return { error: error.message };
  }
}

// Login user
async function handleLogin(userLogin) 
{
  if (!userLogin.username || !userLogin.password) 
  {
    return { error: "Username and password are required" };
  }

  try 
  {
    const user = await prisma.user.findUnique({
      where: { username: userLogin.username },
    });

    if (!user) 
    {
      return { error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);
    if (!isPasswordValid) 
    {
      return { error: "Invalid password" };
    }

    UserSession = user;
    return { message: "Login successful", user };
  } 
  
  catch (error) 
  {
    return { error: error.message };
  }
}

// Logout user
function logout() 
{
  UserSession = null;
}

// Edit profile
async function handleEditProfile(userProfile) 
{
  if (!userProfile.username && !userProfile.password) 
  {
    return { error: "Please provide a username or password to update" };
  }

  if (userProfile.username) 
  {  
    let usernameMessage = UsernamePolicyCheck(userProfile.username);
    
    if (usernameMessage !== "Username is valid") 
    {
      return { error: usernameMessage };
    }
  }

  if (userProfile.password) 
  {
    let passwordMessage = PasswordPolicyCheck(userProfile.password);
    
    if (passwordMessage !== "Password is valid") 
    {
      return { error: passwordMessage };
    }
  }

  try 
  {
    const updatedUser = await prisma.user.update({
      where: { id: UserSession.id },
      
      data: 
      {
        username: userProfile.username,
        password: userProfile.password ? await bcrypt.hash(userProfile.password, saltRounds) : undefined,
      },
    });

    return { message: "Profile updated successfully", updatedUser };
  } 
  
  catch (error) 
  {
    return { error: error.message };
  }
}

// Username policy check
function UsernamePolicyCheck(username) {
  if (!username) {
    return "Username cannot be empty or contain only whitespace!";
  }

  if (username.length < 2) {
    return "Username must be at least 2 characters!";
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "Only letters and digits are allowed in the username!";
  }

  if (!/[A-Z]/.test(username)) {
    return "Username must contain uppercase letters!";
  }

  if (!/[a-z]/.test(username)) {
    return "Username must contain lowercase letters!";
  }

  return "Username is valid";
}

// Password policy check
function PasswordPolicyCheck(password) {
  if (!password) {
    return "Password cannot be empty or contain only whitespace!";
  }

  if (password.length < 5) {
    return "Password must be at least 5 characters!";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain uppercase letters!";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain lowercase letters!";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain numbers!";
  }

  return "Password is valid";
}

// Email policy check
function EmailPolicyCheck(email) {
  if (!email) {
    return "Email cannot be empty or contain only whitespace!";
  }

  if (!email.includes("@")) {
    return "Email must contain '@'.";
  }

  return "Email is valid";
}

module.exports = {
  handleSignUp,
  handleLogin,
  logout,
  handleEditProfile,
  UsernamePolicyCheck,
  PasswordPolicyCheck,
  EmailPolicyCheck,
};
