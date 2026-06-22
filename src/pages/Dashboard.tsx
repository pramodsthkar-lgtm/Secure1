import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { ShieldCheck, AlertOctagon, MapPin, Activity, AlertTriangle } from 'lucide-react';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function Dashboard() {
  const { t } = useTranslation();
  const { activities, isSosActive, triggerSOS, resolveSOS, initMockData } = useStore();
  const mapsKey = process.env.GOOGLE_MAPS_PLATFORM_KEY;

  useEffect(() => {
    initMockData();
  }, [initMockData]);

  // Default coordinate for current device (simulated)
  const currentLocation = { lat: 28.6139, lng: 77.2090 };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 space-y-0">
      
      {/* Left Column (Main) */}
      <div className="lg:col-span-2 space-y-6 flex flex-col">
        
        {/* Top Cards: Status & SOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-700 pb-4 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-500 text-sm tracking-wide uppercase">{t('Security_Status')}</h3>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">95% Secure</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('Status_Safe')}
            </p>
          </div>

          <div className={`p-6 rounded-2xl shadow-sm border transition-colors ${
            isSosActive 
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
              : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${isSosActive ? 'bg-red-500 text-white animate-pulse' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
                <AlertOctagon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-500 text-sm tracking-wide uppercase">{t('SOS_Emergency')}</h3>
                <p className={`text-xl font-bold ${isSosActive ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
                  {isSosActive ? t('SOS_Active') : 'Standby'}
                </p>
              </div>
            </div>
            {isSosActive ? (
              <button 
                onClick={resolveSOS}
                className="w-full py-3 px-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold transition-transform active:scale-95"
              >
                {t('Cancel_SOS')}
              </button>
            ) : (
              <button 
                onClick={triggerSOS}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-transform active:scale-95 shadow-md shadow-red-600/20"
              >
                {t('Trigger_SOS')}
              </button>
            )}
          </div>
        </div>

        {/* Map View */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex-1 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-500" />
              {t('Live_Location')}
            </h2>
          </div>
          <div className="flex-1 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 relative flex items-center justify-center">
            {mapsKey ? (
               <Map 
                  defaultCenter={currentLocation} 
                  defaultZoom={14}
                  mapId={mapsKey}
                  disableDefaultUI={true}
               >
                 <AdvancedMarker position={currentLocation}>
                   <div className="w-4 h-4 bg-indigo-600 border-2 border-white rounded-full shadow-md animate-ping" />
                 </AdvancedMarker>
               </Map>
            ) : (
               <div className="text-center p-8 text-slate-500">
                 <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                 <p>{t('Map_Key_Missing')}</p>
                 <div className="mt-4 p-4 bg-white/50 rounded-lg inline-block shadow-sm">
                    Pretending Map is centered at Lat: {currentLocation.lat}, Lng: {currentLocation.lng}
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column (Sidebar content) */}
      <div className="space-y-6 flex flex-col">
        {/* Activity Feed */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex-1">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-indigo-500" />
            {t('Recent_Activity')}
          </h2>
          {activities.length > 0 ? (
            <div className="space-y-6">
              {activities.map((act, i) => (
                <div key={act.id} className="relative pl-6 before:absolute before:left-2 before:top-2 before:w-px before:h-full before:bg-slate-200 dark:before:bg-slate-700 last:before:hidden">
                  <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
                    act.severity === 'critical' ? 'bg-red-500' : 
                    act.severity === 'warning' ? 'bg-amber-500' : 'bg-indigo-500'
                  }`} />
                  <p className="text-sm font-medium">{act.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{new Date(act.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">{t('No_Activity')}</p>
          )}
        </div>
      </div>
      
    </div>
  );
}
