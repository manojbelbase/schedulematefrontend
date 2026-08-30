import AddLlmConfigForm from "./form/add-llm-config-form";
import AddUserForm from "./form/add-user-form";
import EditLlmConfigForm from "./form/edit-llm-config-form";
import EditUserForm from "./form/edit-user-form";
import SetUserLimitForm from "./form/user-limit-form";
import ConfirmFormExit from "./globals/confirm-form-exit";
import DeleteItemModal from "./globals/delete-item";

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
    description: "",
  },
  EDIT_USER: {
    component: EditUserForm,
    variant: "form",
    className: "max-w-lg!",
    title: "Edit User",
    description: "",
  },
  SET_USER_LIMIT: {
    component: SetUserLimitForm,
    variant: "form",
    className: "max-w-base!",
    title: "Set User Limit",
    description: "",
  },
  ADD_LLM_CONFIG: {
    component: AddLlmConfigForm,
    variant: "form",
    className: "max-w-lg!",
    title: "Add LLM Configuration",
    description: "",
  },
  EDIT_LLM_CONFIG: {
    component: EditLlmConfigForm,
    variant: "form",
    className: "max-w-lg!",
    title: "Edit LLM Configuration",
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

export const SHEETS = {} as const;
