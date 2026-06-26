import { Logger, LoggerType } from '../utils/Logger.js';
const SELPHI_CONFIG = `
    <facephi-selphi-widget 
        stabilization-stage="true" 
        interactible="true" 
        preview-image="true" 
        timeout="30000" 
		antispoof="true"
        show-log="false">
    </facephi-selphi-widget>
`;

export function initSelphiWidget(sdkProvider) {
	sdkProvider.innerHTML = SELPHI_CONFIG;
	const selphiWidget = document.querySelector('facephi-selphi-widget');

	//SELPHI EVENTS
	function handleModuleLoaded(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHI, 'widgetLoaded', result);
	}

	function handleExtractionFinish(event) {
    const result = event.detail.detail;

    const blob = result?.extractionData?.encryptedLivenessRaw;

    console.log(blob);

    if (blob instanceof Blob) {
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'iadBundle.bin';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    } else {
        console.warn('encryptedLivenessRaw no es un Blob', blob);
    }

		sdkProvider.innerHTML = '<div class="onboarding-finished">ONBOARDING FINISHED</div>';
	}

	function handleTimeoutErrorButtonClick(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHI, 'timeoutErrorButtonClick', result);
	}

	function handleExtractionTimeout(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHI, 'extractionTimeout', result);
	}

	function handleUserCancel(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHI, 'userCancel', result);
	}

	function handleExceptionCaptured(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHI, 'exceptionCaptured', result);
	}

	function handleErrorTimeout(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHI, 'errorTimeout', result);
	}

	function handleTrackStatus(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHI, 'trackStatus', result);
	}

	function handleStabilizing(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHI, 'stabilizing', result);
	}

	if (selphiWidget) {
		selphiWidget.addEventListener('extractionFinish', handleExtractionFinish);
		selphiWidget.addEventListener('extractionTimeout', handleExtractionTimeout);
		selphiWidget.addEventListener('exceptionCaptured', handleExceptionCaptured);
		selphiWidget.addEventListener('errorTimeout', handleErrorTimeout);
		selphiWidget.addEventListener('moduleLoaded', handleModuleLoaded);
		selphiWidget.addEventListener('timeoutErrorButtonClick', handleTimeoutErrorButtonClick);
		selphiWidget.addEventListener('userCancel', handleUserCancel);
		selphiWidget.addEventListener('trackStatus', handleTrackStatus);
		selphiWidget.addEventListener('stabilizing', handleStabilizing);
	}
}
