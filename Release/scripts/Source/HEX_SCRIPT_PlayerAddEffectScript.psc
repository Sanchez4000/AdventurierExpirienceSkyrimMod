Scriptname HEX_SCRIPT_PlayerAddEffectScript extends Quest  
{�����, �������� ��������� ������ ������}

SPELL Property EffectSpell  Auto  
{������, ������� ����� ����� ������}

event OnInit()
	Game.GetPlayer().AddSpell(EffectSpell, false);
endevent