!macro customHeader
  ; Show the file extraction details list during installation
  ShowInstDetails show
!macroend

!macro customInit
  ; Best-effort: terminate a running app instance before install/uninstall
  ; to avoid NSIS "app cannot be closed" errors during upgrades.
  nsExec::ExecToLog 'taskkill /IM "${APP_EXECUTABLE_FILENAME}" /F /T'
  Pop $0
  Sleep 800
!macroend

!macro customInstall
  ; ─── V8 Compile Cache Warmup (silent) ───
  ; After files are extracted to $INSTDIR, load the gateway bundle once using
  ; Electron's own Node runtime (ELECTRON_RUN_AS_NODE=1) so V8 compiles and
  ; caches the bytecode.  This turns the user's first gateway startup from
  ; ~95s (cold V8 compile) into ~15s (cached bytecode).
  ;
  ; The warmup script is a no-op when the bundle is missing and exits 0 on
  ; any error, so it cannot block or break the installer.
  ;
  ; We use ExecToStack (not ExecToLog) so no output appears in the details list,
  ; and suppress DetailPrint so nothing reveals the warmup to the user.

  SetDetailsPrint none

  StrCpy $1 "$APPDATA\LobsterAI\openclaw\state\.compile-cache"

  System::Call 'Kernel32::SetEnvironmentVariable(t "ELECTRON_RUN_AS_NODE", t "1")i'
  System::Call 'Kernel32::SetEnvironmentVariable(t "NODE_COMPILE_CACHE", t "$1")i'

  nsExec::ExecToStack '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "$INSTDIR\resources\cfmind\warmup-compile-cache.cjs" --cache-dir "$1"'
  Pop $0
  Pop $1

  System::Call 'Kernel32::SetEnvironmentVariable(t "ELECTRON_RUN_AS_NODE", t "")i'
  System::Call 'Kernel32::SetEnvironmentVariable(t "NODE_COMPILE_CACHE", t "")i'

  SetDetailsPrint both
!macroend
