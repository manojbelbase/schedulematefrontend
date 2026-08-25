import AddUserForm from "./form/add-user-form";
import EditUserForm from "./form/edit-user-form";
import ConfirmFormExit from "./globals/confirm-form-exit";
import DeleteItemModal from "./globals/delete-item";
import ViewUserModal from "./user/user-view";

export const EXIT_WARNING_MODAL = "CONFIRM_EXIT";

export const MODALS = {
  CONFIRM_EXIT: {
    component: ConfirmFormExit,
    variant: "warning",
    className: "max-w-sm!",
    title: "Are you sure?",
    description: "",
  },
  ADD_USER: {
    component: AddUserForm,
    variant: "form",
    className: "max-w-lg!",
    title: "Add User",
    description: "Create a new user account.",
  },
  EDIT_USER: {
    component: EditUserForm,
    variant: "form",
    className: "max-w-lg!",
    title: "Edit User",
    description: "Update user details.",
  },
  VIEW_USER: {
    component: ViewUserModal,
    variant: "default",
    className: "max-w-md!",
    title: "User Details",
    description: "",
  },
  DELETE_MODAL: {
    component: DeleteItemModal,
    variant: "warning",
    className: "max-w-sm!",
    title: "",
    description: "",
  },
} as const;

export const SHEETS = {
  USER_PROFILE: {
    component: ViewUserModal,
    variant: "default",
    className: "max-w-md!",
    side: "right",
  },
} as const;
