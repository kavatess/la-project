import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@libs/models';

// Form Actions
export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    getProfile: emptyProps(),
    getProfileError: props<{ error: Error }>(),
    loadProfile: props<{ data: User }>(),
    changePassword: props<{ oldPassword: string; newPassword: string }>(),
    changePasswordSuccess: emptyProps(),
    changePasswordError: props<{ error: Error }>(),
    updateProfile: props<{ data: User }>(),
    updateProfileError: props<{ error: Error }>(),
  },
});
