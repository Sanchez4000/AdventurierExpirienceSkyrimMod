Scriptname HEX_SCRIPT_TestScript extends Quest  
{Проверяю всякое}

FormList property SomeGroupedType Auto
{Попытка взаимодействия с глобалами через FormList}
HEX_SCRIPT_FormListFacade property Facade Auto
{Мб фасад?}

event OnInit()
	Debug.Notification("Тест квест запущен");
	return;
	float fValue = getGroupedTypeValue(SomeGroupedType);
	int iDivider = getGroupedTypeDivider(SomeGroupedType);
	float fResult = fValue / iDivider;
	Debug.Notification("Стартовые значения: " + fValue + "/" + iDivider + " (" + fResult + ")");

	RegisterForSingleUpdate(10.0);
endevent

event OnUpdate()
	float fValue = HEX_SCRIPT_FormListFacade.getGroupedTypeValue(SomeGroupedType);
	int iDivider = getGroupedTypeDivider(SomeGroupedType);

	float fResult = fValue / iDivider;
	Debug.Notification("Текущие значение: " + fValue + "/" + iDivider + " (" + fResult + ")");

	fValue += 1.0;
	iDivider += 1;

	setGroupedTypeValue(SomeGroupedType, fValue);
	setGroupedTypeDivider(SomeGroupedType, iDivider);

	RegisterForSingleUpdate(10.0);
endevent

float function getGroupedTypeValue(FormList source)
	int formListValueIndex = 0;
	GlobalVariable valueItem = source.GetAt(formListValueIndex) as GlobalVariable;

	return valueItem.GetValue();
endfunction

function setGroupedTypeValue(FormList source, float fValue)
	int formListValueIndex = 0;
	GlobalVariable valueItem = source.GetAt(formListValueIndex) as GlobalVariable;
	valueItem.SetValue(fValue);
endfunction

int function getGroupedTypeDivider(FormList source)
	int formDividerIndex = 1;
	GlobalVariable dividerItem = source.GetAt(formDividerIndex) as GlobalVariable;

	return dividerItem.GetValueInt();
endfunction

function setGroupedTypeDivider(FormList source, int iValue)
	int formDividerIndex = 1;
	GlobalVariable dividerItem = source.GetAt(formDividerIndex) as GlobalVariable;
	dividerItem.SetValueInt(iValue);
endfunction