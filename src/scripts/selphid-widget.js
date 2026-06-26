import { initSelphiWidget } from './selphi-widget.js';
import { Logger, LoggerType } from '../utils/Logger.js';

const SELPHID_CONFIG = `
    <facephi-selphid-widget 
        country="MX" 
        preview-image="true" 
        capture-timeout="10" 
        capture-retries="3" 
        show-log="false">
    </facephi-selphid-widget>
`;

export function initSelphidWidget(sdkProvider) {
	sdkProvider.innerHTML = SELPHID_CONFIG;
	const selphidWidget = document.querySelector('facephi-selphid-widget');

	// SELPHID EVENTS
	function handleExtractionFinish(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHID, 'extractionFinish', result);
		// Initialize Selphi
		initSelphiWidget(sdkProvider);
	}

	function handleExtractionTimeout(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHID, 'extractionTimeout', result);
		Logger.printLog(LoggerType.SELPHID, 'extractionFinish', result);
	}

	function handleExceptionCaptured(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHID, 'exceptionCaptured', result);
	}

	function handleErrorTimeout(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHID, 'errorTimeout', result);
	}

	function handleModuleLoaded(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHID, 'widgetLoaded', result);
	}

	function handleTimeoutErrorButtonClick(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHID, 'timeoutErrorButtonClick', result);
	}

	function handleUserCancel(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHID, 'userCancel', result);
	}

	function handleTrackStatus(event) {
		const result = event.detail.detail;
		Logger.printLog(LoggerType.SELPHID, 'trackStatus', result);
	}

	if (selphidWidget) {
		selphidWidget.addEventListener('extractionFinish', handleExtractionFinish);
		selphidWidget.addEventListener('extractionTimeout', handleExtractionTimeout);
		selphidWidget.addEventListener('exceptionCaptured', handleExceptionCaptured);
		selphidWidget.addEventListener('errorTimeout', handleErrorTimeout);
		selphidWidget.addEventListener('moduleLoaded', handleModuleLoaded);
		selphidWidget.addEventListener('timeoutErrorButtonClick', handleTimeoutErrorButtonClick);
		selphidWidget.addEventListener('userCancel', handleUserCancel);
		selphidWidget.addEventListener('trackStatus', handleTrackStatus);
	}
}
