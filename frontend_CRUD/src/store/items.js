const API_URL = "https://localhost:7067/auth";

export async function getItems() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://localhost:7067/Products/getproducts/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      console.log("faild to fetch items!");
    }

    return await response.json();
  } catch (error) {
    console.log("error fetcing items", error);
  }
}

export async function deleteItem(id, setData) {
  try {
    let res = await fetch(
      `https://localhost:7067/Products/deleteproduct/${id}`,
      {
        method: "DELETE",
      }
    );
    const newData = await getItems();
    setData(newData);
  } catch (error) {
    console.log("Product delete error", error);
  }
}

export async function createItem(formData) {
  try {
    if (formData.name && formData.image) {
      let res = await fetch(`https://localhost:7067/Products/createProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await res.json();
      await getItems();
      return { success: true, message: "Product created successfully" };
    } else {
      console.log("please fill all feilds");
    }
  } catch (error) {
    console.log("create error", error);
  }
}

export async function editItem(updateditem, id, setData) {
  try {
    const res = await fetch(
      `https://localhost:7067/Products/updateproduct/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateditem),
      }
    );

    const newData = await getItems();
    // if (!response.ok) {
    //   console.log("Update failed!");
    //   return;
    // }

    setData(newData);
  } catch (error) {
    console.log("edit error", error);
  }
}

//

export async function handleSignup(
  { username, password },
  setIsLoggedIn,
  navigate
) {
  console.log(username, password);

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);

      setIsLoggedIn(true);

      navigate("/");
    } else {
      throw new Error(data.message || "Signup failed");
    }
  } catch (err) {
    console.error(err);
    alert(err.message || "Something went wrong!");
  }
}

export async function handleLogin(
  { username, password },
  setIsLoggedIn,
  navigate
) {
  console.log(username, password);

  try {
    const res = await fetch("https://localhost:7067/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);

      setIsLoggedIn(true);

      navigate("/");
    } else {
      throw new Error(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err.message || "Something went wrong!");
  }
}

export function handleLogout(setIsLoggedIn, navigate) {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  navigate("/");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}
