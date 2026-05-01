export const syncAuthSession = async (firebaseUser, api) => {
  if (!firebaseUser?.email) {
    await api.post("/logout", {}, { withCredentials: true });
    return null;
  }

  const idToken = await firebaseUser.getIdToken();
  await api.post("/jwt", { idToken }, { withCredentials: true });
  return firebaseUser;
};
