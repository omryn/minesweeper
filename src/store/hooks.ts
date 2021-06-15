import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import  {userActions} from "./user.actions";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const withDispatch = <T extends (...args: any[]) => any>(dispatch: AppDispatch, action: T) => {
  return (...args: Parameters<T>) => dispatch(action(...args));
};

type UserActions = typeof userActions;
type ActionsWithDispatch = {[K in keyof UserActions]: UserActions[K]}

export const usePlayerActions = () => {
  const dispatch = useAppDispatch();
  const actionsWidthDispatch:Record<string, any> = {};
  for (const [name, action] of Object.entries(userActions)) {
      actionsWidthDispatch[name] = withDispatch(dispatch, action)
  }
  return actionsWidthDispatch as ActionsWithDispatch;
};
