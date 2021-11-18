SELECT DISTINCT L.Kürzel, L.Nachname, F.Kürzel
FROM Fach F, Lehrer L, lehrt B
WHERE B.ID_Lehrer = F.ID_Fach;