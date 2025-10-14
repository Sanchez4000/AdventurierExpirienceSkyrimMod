Scriptname HEX_SCRIPT_PlayerAddEffectScript extends Quest  
{ вест, выдающий персонажу игрока эффект}

SPELL Property EffectSpell  Auto  
{Ёффект, который будет выдан игроку}

event OnInit()
	Game.GetPlayer().AddSpell(EffectSpell, false);
endevent