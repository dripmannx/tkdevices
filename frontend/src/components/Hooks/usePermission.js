const usePermission = (permission) => {
  if (JSON.parse(localStorage.getItem("user"))?.permissions.includes(permission))
    return true;
  console.log(permission);
  return false;
};
export default usePermission