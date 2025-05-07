{
  description = "Dev env and package for my astal configuration.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    ags = {
      url = "github:aylur/ags/v3";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, ags }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
    pname = "astal-shell";
    entry = ./app.ts;

    astalPackages = with ags.packages.${system}; [
      astal4
      battery
      powerprofiles
      io
    ];

    extraPackages =
      astalPackages
      ++ [
        pkgs.libadwaita
        pkgs.libsoup_3
      ];
  in {
    packages.${system}.default = pkgs.stdenvNoCC.mkDerivation {
      name = pname;
      src = ./.;

      nativeBuildInputs = with pkgs; [
        wrapGAppsHook
        gobject-introspection
        ags.packages.${system}.default
      ];

      buildInputs = extraPackages ++ [pkgs.gjs];

      installPhase = ''
        runHook preInstall

        mkdir -p $out/bin
        mkdir -p $out/share
        cp -r * $out/share
        ags bundle ${entry} $out/bin/${pname} -d "SRC='$out/share'"

        runHook postInstall
      '';
    };

    devShells.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        (ags.packages.${system}.default.override {
          inherit extraPackages;
        })
        typescript
        typescript-language-server
        prettierd
        dart-sass
        vscode-langservers-extracted
      ];
    };
  };
}
