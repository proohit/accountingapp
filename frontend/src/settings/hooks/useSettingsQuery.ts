import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UserSettings } from '../models/UserSettings';
import { SettingsApiService } from '../services/SettingsApi';

const settingsApi = new SettingsApiService();

export const useUserSettingsQuery = () => {
  return useQuery<UserSettings>(
    ['getUserSettings'],
    () => settingsApi.getUserSettings(),
    { staleTime: 15000 }
  );
};

export const useUpdateUserSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (settings: UserSettings) => settingsApi.updateSettings(settings),
    { onSuccess: () => queryClient.invalidateQueries('getUserSettings') }
  );
};
