import { UserSettingsDto } from '@accountingapp/shared';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SettingsApiService } from '../services/SettingsApi';

const settingsApi = new SettingsApiService();

export const useUserSettingsQuery = () => {
  return useQuery<UserSettingsDto>(
    ['getUserSettings'],
    () => settingsApi.getUserSettings(),
    { staleTime: 15000 }
  );
};

export const useUpdateUserSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (settings: UserSettingsDto) => settingsApi.updateSettings(settings),
    { onSuccess: () => queryClient.invalidateQueries('getUserSettings') }
  );
};
