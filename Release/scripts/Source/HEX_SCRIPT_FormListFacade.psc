Scriptname HEX_SCRIPT_FormListFacade

float function getGroupedTypeValue(FormList source) global
	int formListValueIndex = 0;
	GlobalVariable item = source.GetAt(formListValueIndex) as GlobalVariable;

	return item.GetValue();
endfunction

function setGroupedTypeValue(FormList source, float fValue) global
	int formListValueIndex = 0;
	GlobalVariable item = source.GetAt(formListValueIndex) as GlobalVariable;

	item.SetValue(fValue);
endfunction

int function getGroupedTypeDivider(FormList source) global
	int formDividerIndex = 1;
	GlobalVariable item = source.GetAt(formDividerIndex) as GlobalVariable;

	return item.GetValueInt();
endfunction

function setGroupedTypeDivider(FormList source, int iValue) global
	int formDividerIndex = 1;
	GlobalVariable item = source.GetAt(formDividerIndex) as GlobalVariable;

	item.SetValueInt(iValue);
endfunction

function test()
	Debug.Notification("HEX_SCRIPT_FormListFacade test");
endfunction