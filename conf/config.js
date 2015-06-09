/**
 * This is a configuration file.
 * Changes to this file may cause the application does not work as it should
 *
 * Default hosts
 * CELLBASE_HOST = "http://usa.cellbase.org:8080/cellbase/rest";
 * CELLBASE_HOST = "http://ws.bioinfo.cipf.es/cellbase/rest";
 * OPENCGA_HOST = "http://ws.bioinfo.cipf.es/gcsa/rest";
 *
 * Deprecated hosts
 * WUM_HOST = "http://ws.bioinfo.cipf.es/wum/rest";
 *
 **/
CELLBASE_VERSION = "v3";
//CELLBASE_HOST = "http://ws.bioinfo.cipf.es/cellbase/rest";
CELLBASE_HOST = "http://bioinfodev.hpc.cam.ac.uk/cellbase/webservices/rest";
//CELLBASE_HOST = "http://bioinfo.hpc.cam.ac.uk/cellbase/webservices/rest";
OPENCGA_HOST = "ws.babelomics.org/opencga/rest";
OPENCGA_LOCALHOST = "http://localhost:61976/opencga/rest";

/** Devel only: custom URL check **/
if (
    window.location.host.indexOf("localhost") != -1 ||
        window.location.host.indexOf("fsalavert") != -1 ||
        window.location.host.indexOf("rsanchez") != -1 ||
        window.location.host.indexOf("imedina") != -1 ||
        window.location.href.indexOf("http://bioinfo.cipf.es/apps-beta") != -1 ||
        window.location.protocol === "file:"
    ) {

//    CELLBASE_HOST = "http://ws-beta.bioinfo.cipf.es/cellbase/rest";
    //CELLBASE_HOST = "http://rsanchez:8080/cellbase/rest";
    //CELLBASE_HOST = "http://imedina:8080/cellbase/rest";

    OPENCGA_HOST = "http://ws-beta.bioinfo.cipf.es/opencga-staging/rest";
//    OPENCGA_HOST = "http://fsalavert:8080/opencga/rest";
//    OPENCGA_HOST = "http://aaleman:8080/opencga-server-0.3.2/rest";
    OPENCGA_HOST = "http://test.babelomics.org/opencga/rest";
}


/*Panel settings*/
CONFPANELHIDDEN = false;
REGIONPANELHIDDEN = true;
/**/


/** List of available species in the cellbase service **/

//var POPULAR_SPECIES = ["Homo sapiens", "Mus musculus", "Danio rerio", "Drosophila melanogaster", "Saccharomyces cerevisiae", "Plasmodium falciparum", "Arabidopsis thaliana", "Citrus Clementina"];
var POPULAR_SPECIES = ["Homo sapiens"];


//, , , , , ,
//    , , , , , , ,
//    , , , , , , ,
//

var AVAILABLE_SPECIES = {
    "text": "Species",
    "items": [
        {
            "text": "Vertebrates",
            "items": [
                //{"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "13", "start": 32889611, "end": 32889611}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-75/"},
                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "20", "start": 32878277, "end": 32878277}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                //{"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "20", "start":14370, "end": 14370}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "13", "start": 32889611, "end": 32973805}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                // {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "20", "start": 32886270, "end": 32886288}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "13", "start": 32889599, "end": 32889739}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Homo sapiens", "assembly": "GRCh37.p10", "region": {"chromosome": "1", "start": 32877109, "end": 32882337}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Homo sapiens", "assembly": "GRCh38", "region": {"chromosome": "13", "start": 32889611, "end": 32889611}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Mus musculus", "assembly": "GRCm38.p1", "region": {"chromosome": "1", "start": 18422009, "end": 18422009}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Rattus norvegicus", "assembly": "Rnor_5.0", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Bos taurus", "assembly": "UMD3.1", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Canis familiaris", "assembly": "CanFam3.1", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Danio rerio", "assembly": "Zv9", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Gallus gallus", "assembly": "Galgal4", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "32", "W", "Z", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Sus scrofa", "assembly": "Sscrofa10.2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
                {"text": "Ciona intestinalis", "assembly": "KH", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Equus caballus", "assembly": "EquCab2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Felis catus", "assembly": "Felis_catus_6.2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["A1", "A2", "A3", "B1", "B2", "B3", "B4", "C1", "C2", "D1", "D2", "D3", "D4", "E1", "E2", "E3", "F1", "F2", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Gorilla gorilla", "assembly": "gorGor3.1", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2a", "2b", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Macaca mulatta", "assembly": "MMUL_1.0", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Oryctolagus cuniculus", "assembly": "oryCun2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "X", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Pan troglodytes", "assembly": "CHIMP2.1.4", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2A", "2B", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"},
//                {"text": "Pongo abelii", "assembly": "PPYG2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2a", "2b", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Un", "MT"], "url": "ftp://ftp.ensembl.org/pub/release-76/"}
            ]
        },
        {
            "text": "Metazoa",
            "items": [
                {"text": "Anopheles gambiae", "assembly": "AgamP3", "region": {"chromosome": "2L", "start": 1000000, "end": 1000000}, "chromosomes": ["2L", "2R", "3L", "3R", "X"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"},
                {"text": "Caenorhabditis elegans", "assembly": "WBcel235", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "X", "MtDNA"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/fasta/"},
                {"text": "Drosophila melanogaster", "assembly": "BDGP5", "region": {"chromosome": "2L", "start": 1000000, "end": 1000000}, "chromosomes": ["2L", "2LHet", "2R", "2RHet", "3L", "3LHet", "3R", "3RHet", "4", "U", "Uextra", "X", "XHet", "YHet", "dmel_mitochondrion_genome"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"},
//                {"text": "Drosophila simulans", "assembly": "WUGSC1", "region": {"chromosome": "2L", "start": 1000000, "end": 1000000}, "chromosomes": ["2L", "2R", "3L", "3R", "4", "X"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"},
//                {"text": "Drosophila yakuba", "assembly": "dyak_r1.3", "region": {"chromosome": "2L", "start": 1000000, "end": 1000000}, "chromosomes": ["2L", "2R", "3L", "3R", "4", "chr2h", "chr3h", "chrXh", "chrYh", "X"], "url": "ftp://ftp.ensemblgenomes.org/pub/metazoa/release-18/"}
            ]
        },
        {
            "text": "Fungi",
            "items": [
                {"text": "Aspergillus fumigatus", "assembly": "CADRE", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "MT"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
                {"text": "Saccharomyces cerevisiae", "assembly": "SacCer_Apr2011", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "Mito"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
//                {"text": "Aspergillus nidulans", "assembly": "ASM1142v1", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
//                {"text": "Aspergillus niger", "assembly": "CADRE", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
//                {"text": "Aspergillus oryzae", "assembly": "CADRE2", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"},
//                {"text": "Schizosaccharomyces pombe", "assembly": "ASM294v1", "region": {"chromosome": "I", "start": 1000000, "end": 1000000}, "chromosomes": ["AB325691", "I", "II", "III", "MT", "MTR"], "url": "ftp://ftp.ensemblgenomes.org/pub/fungi/release-18/"}
            ]
        },
        {
            "text": "Protist",
            "items": [
                {"text": "Leishmania major", "assembly": "ASM272v2", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"], "url": "ftp://ftp.ensemblgenomes.org/pub/protists/release-18/"},
                {"text": "Plasmodium falciparum", "assembly": "ASM276v1", "region": {"chromosome": "01", "start": 1000000, "end": 1000000}, "chromosomes": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"], "url": "ftp://ftp.ensemblgenomes.org/pub/protists/release-18/"}
            ]
        },
        {
            "text": "Plants",
            "items": [
                {"text": "Arabidopsis thaliana", "assembly": "TAIR10", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "Mt", "Pt"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Glycine max", "assembly": "V1.0", "region": {"chromosome": "Gm01", "start": 1000000, "end": 1000000}, "chromosomes": ["Gm01", "Gm02", "Gm03", "Gm04", "Gm05", "Gm06", "Gm07", "Gm08", "Gm09", "Gm10", "Gm11", "Gm12", "Gm13", "Gm14", "Gm15", "Gm16", "Gm17", "Gm18", "Gm19", "Gm20"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Oryza sativa", "assembly": "MSU6", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "Mt", "Pt", "Sy", "Un"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Vitis vinifera", "assembly": "IGGP_12x", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "Un"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
                {"text": "Zea mays", "assembly": "AGPv3", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Mt", "Pt"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
//                {"text": "Arabidopsis lyrata", "assembly": "v.1.0", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5", "6", "7", "8"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"},
//                {"text": "Brachypodium distachyon", "assembly": "v1.0", "region": {"chromosome": "1", "start": 1000000, "end": 1000000}, "chromosomes": ["1", "2", "3", "4", "5"], "url": "ftp://ftp.ensemblgenomes.org/pub/plants/release-18/"}
//                  {"text": "Citrus Clementina", "assembly": "1.0", "region":{"chromosome":"scaffold_1","start":233423,"end":236969},   "chromosomes": [], "url": ""}
            ]
        }
    ]
};

/** Reference to a species from the list to be shown at start **/
//var DEFAULT_SPECIES = AVAILABLE_SPECIES.items[0].items[8];
var DEFAULT_SPECIES = AVAILABLE_SPECIES.items[0].items[0];

var SPECIES_TRACKS_GROUP = {

    "hsapiens": "group1",
    "mmusculus": "group1",
    "rnorvegicus": "group1",
    "ptroglodytes": "group1",
    "ggorilla": "group1",
    "pabelii": "group1",
    "mmulatta": "group1",
    "sscrofa": "group1",
    "cfamiliaris": "group1",
    "ecaballus": "group1",
    "ocuniculus": "group1",
    "ggallus": "group1",
    "btaurus": "group1",
    "fcatus": "group1",
    "drerio": "group1",
    "cintestinalis": "group1",
    "dmelanogaster": "group1",
    "dsimulans": "group1",
    "dyakuba": "group1",
    "agambiae": "group1",
    "celegans": "group1",
    "scerevisiae": "group1",
    "spombe": "group1",
    "afumigatus": "group1",
    "aniger": "group1",
    "anidulans": "group1",
    "aoryzae": "group1",
    "pfalciparum": "group1",
    "lmajor": "group1",
    "athaliana": "group1",
    "alyrata": "group1",
    "bdistachyon": "group1",
    "osativa": "group1",
    "gmax": "group1",
    "vvinifera": "group1",
    "zmays": "group1",
    "cclementina": "group1",

    "hsa": "group1",
    "mmu": "group2",
    "rno": "group2",
    "dre": "group2",
    "rno": "group2",
    "dme": "group2",
    "sce": "group2",
    "cel": "group2",
    "ssc": "group2",
    "cfa": "group3",
    "aga": "group3",
    "pfa": "group3",
    "ccl": "group1"
};

var TRACKS = {"group1": [
    {"category": "Core",
        "tracks": [
//					          {"id":"Cytoband", "disabled":false, "checked":true},
            {"id": "Sequence", "disabled": false, "checked": true},
            {"id": "Gene/Transcript", "disabled": false, "checked": true},
            {"id": "CpG islands", "disabled": true, "checked": false}
        ]
    },
    {"category": "Variation",
        "tracks": [
            {"id": "SNP", "disabled": false, "checked": true},
            {"id": "EBI EVA 1.0 SNVs", "disabled": false, "checked": false},
            //{"id": "Mutation", "disabled": false, "checked": true},
            {"id": "Structural variation (<20Kb)", "disabled": true, "checked": false},
            {"id": "Structural variation (>20Kb)", "disabled": true, "checked": false}
        ]
    },
    {"category": "Regulatory",
        "tracks": [
            {"id": "TFBS", "disabled": false, "checked": false},
            {"id": "miRNA targets", "disabled": false, "checked": false},
//			                  {"id":"Histone", "disabled":false, "checked":false},
//			                  {"id":"Polymerase", "disabled":false, "checked":false},
//			                  {"id":"Open Chromatin", "disabled":true, "checked":false},
            {"id": "Conserved regions", "disabled": false, "checked": false}
        ]
    }
],
    "group2": [
        {"category": "Core",
            "tracks": [
//					          {"id":"Cytoband", "disabled":false, "checked":true},
                {"id": "Sequence", "disabled": false, "checked": true},
                {"id": "Gene/Transcript", "disabled": false, "checked": true},
                {"id": "CpG islands", "disabled": true, "checked": false}
            ]
        },
        {"category": "Variation",
            "tracks": [
                {"id": "SNP", "disabled": true, "checked": true},
                {"id": "Mutation", "disabled": true, "checked": false},
                {"id": "Structural variation (<20Kb)", "disabled": true, "checked": false},
                {"id": "Structural variation (>20Kb)", "disabled": true, "checked": false}
            ]
        },
        {"category": "Regulatory",
            "tracks": [
                {"id": "TFBS", "disabled": true, "checked": false},
                {"id": "miRNA targets", "disabled": true, "checked": false},
                {"id": "Histone", "disabled": true, "checked": false},
                {"id": "Polymerase", "disabled": true, "checked": false},
                {"id": "Open Chromatin", "disabled": true, "checked": false},
                {"id": "Conserved regions", "disabled": true, "checked": false}
            ]
        }
    ],
    "group3": [
        {"category": "Core",
            "tracks": [
//					          {"id":"Cytoband", "disabled":false, "checked":true},
                {"id": "Sequence", "disabled": false, "checked": true},
                {"id": "Gene/Transcript", "disabled": false, "checked": true},
                {"id": "CpG islands", "disabled": true, "checked": false}
            ]
        },
        {"category": "Variation",
            "tracks": [
                {"id": "SNP", "disabled": true, "checked": false},
                {"id": "Mutation", "disabled": true, "checked": false},
                {"id": "Structural variation (<20Kb)", "disabled": true, "checked": false},
                {"id": "Structural variation (>20Kb)", "disabled": true, "checked": false}
            ]
        },
        {"category": "Regulatory",
            "tracks": [
                {"id": "TFBS", "disabled": true, "checked": false},
                {"id": "miRNA targets", "disabled": true, "checked": false},
                {"id": "Histone", "disabled": true, "checked": false},
                {"id": "Polymerase", "disabled": true, "checked": false},
                {"id": "Open Chromatin", "disabled": true, "checked": false},
                {"id": "Conserved regions", "disabled": true, "checked": false}
            ]
        }
    ]
};

var DAS_TRACKS = [
    {"species": "hsapiens",
        "categories": [
            {"name": "Core",
                "sources": [
                    {"name": "GRC Region GRCh37", "url": "http://das.sanger.ac.uk/das/grc_region_GRCh37/features", "checked": false},
                    {"name": "Vega genes", "url": "http://das.sanger.ac.uk/das/vega_ens_zv8_genes/features", "checked": false}
                ]
            },
            {"name": "Variation",
                "sources": [
                    {"name": "Cosmic Mutations GRCh37", "url": "http://das.sanger.ac.uk/das/cosmic_mutations_GRCh37/features", "checked": false}
                ]
            },
            {"name": "Regulatory",
                "sources": []
            }
        ]
    },
    {"species": "mmusculus",
        "categories": [
            {"name": "Core",
                "sources": []
            },
            {"name": "Variation",
                "sources": []
            },
            {"name": "Regulatory",
                "sources": [
                    {"name": "miRNAs", "url": "http://www.ebi.ac.uk/das-srv/genomicdas/das/mmuprimiRNA/", "checked": false}
                ]
            }
        ]
    },
    {"species": "drerio",
        "categories": [
            {"name": "Core",
                "sources": []
            },
            {"name": "Variation",
                "sources": []
            },
            {"name": "Regulatory",
                "sources": []
            }
        ]
    },
    {"species": "rnorvegicus",
        "categories": [
            {"name": "Core",
                "sources": []
            },
            {"name": "Variation",
                "sources": []
            },
            {"name": "Regulatory",
                "sources": [
                    {"name": "miRNAs", "url": "http://www.ebi.ac.uk/das-srv/genomicdas/das/rnoprimiRNA/", "checked": false}
                ]
            }
        ]
    },
    {"species": "dmelanogaster",
        "categories": [
            {"name": "Core",
                "sources": []
            },
            {"name": "Variation",
                "sources": []
            },
            {"name": "Regulatory",
                "sources": []
            }
        ]
    },
    {"species": "scerevisiae",
        "categories": [
            {"name": "Core",
                "sources": []
            },
            {"name": "Variation",
                "sources": []
            },
            {"name": "Regulatory",
                "sources": []
            }
        ]
    },
    {"species": "celegans",
        "categories": [
            {"name": "Core",
                "sources": []
            },
            {"name": "Variation",
                "sources": []
            },
            {"name": "Regulatory",
                "sources": []
            }
        ]
    }
];
