<?php

namespace App\Enums;

enum PrayerTimeMethod: int {
    case JafariShiaIthnaAshari = 0;
    case UniversityofIslamicSciencesKarachi = 1;
    case IslamicSocietyofNorthAmerica = 2;
    case MuslimWorldLeague = 3;
    case UmmAlQuraUniversityMakkah = 4;
    case EgyptianGeneralAuthorityofSurvey = 5;
    case InstituteofGeophysicsUniversityofTehran = 7;
    case GulfRegion = 8;
    case Kuwait = 9;
    case Qatar = 10;
    case MajlisUgamaIslamSingapuraSingapore = 11;
    case UnionOrganizationIslamicdeFrance = 12;
    case DiyanetTurkey = 13;
    case SpiritualAdministrationofMuslimsofRussia = 14;
    case MoonsightingCommitteeWorldwide = 15;
    case Dubai = 16;
    case JabatanKemajuanIslamMalaysia = 17;
    case Tunisia = 18;
    case Algeria = 19;
    case KEMENAGKementerianAgamaRepublikIndonesia = 20;
    case Morocco = 21;
    case ComunidadeIslamicadeLisboa = 22;
    case MinistryofAwqafIslamicAffairsandHolyPlacesJordan = 23;


    public function text() {
        return match($this) {
            self::JafariShiaIthnaAshari => 'Jafari / Shia Ithna-Ashar',
            self::UniversityofIslamicSciencesKarachi => 'University of Islamic Sciences, Karachi',
            self::IslamicSocietyofNorthAmerica => 'Islamic Society of North America',
            self::MuslimWorldLeague => 'Muslim World League',
            self::UmmAlQuraUniversityMakkah => 'Umm Al-Qura University, Makkah',
            self::EgyptianGeneralAuthorityofSurvey => 'Egyptian General Authority of Survey',
            self::InstituteofGeophysicsUniversityofTehran => 'Institute of Geophysics, University of Tehran',
            self::GulfRegion => 'Gulf Region',
            self::Kuwait => 'Kuwait',
            self::Qatar => 'Qatar',
            self::MajlisUgamaIslamSingapuraSingapore => 'Majlis Ugama Islam Singapura, Singapore',
            self::UnionOrganizationIslamicdeFrance => 'Union Organization islamic de France',
            self::DiyanetTurkey => 'Diyanet İşleri Başkanlığı, Turkey',
            self::SpiritualAdministrationofMuslimsofRussia => 'Spiritual Administration of Muslims of Russia',
            self::MoonsightingCommitteeWorldwide => 'Moonsighting Committee Worldwide (Requires shafaq parameter)',
            self::Dubai => 'Dubai (experimental)',
            self::JabatanKemajuanIslamMalaysia => 'Jabatan Kemajuan Islam Malaysia (JAKIM)',
            self::Tunisia => 'Tunisia',
            self::Algeria => 'Algeria',
            self::KEMENAGKementerianAgamaRepublikIndonesia => 'KEMENAG - Kementerian Agama Republik Indonesia',
            self::Morocco => 'Morocco',
            self::ComunidadeIslamicadeLisboa => 'Comunidade Islamica de Lisboa',
            self::MinistryofAwqafIslamicAffairsandHolyPlacesJordan => 'Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan',
        };
    }
}